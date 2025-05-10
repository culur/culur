import type { Arrayable } from '@culur/types';
import type { AsyncResultIteratorPromise } from 'async';
import type { BaseRunnable, IRootObject } from './base';
import type { TaskGroup } from './tasks.group';
import type { LineColProps, LineProps } from '~/components';
import type { TaskCallback, TaskOptions, TaskResponse, TasksCallback, TasksOptions, TasksOptionsExtra, TasksResponse, TasksTitle } from '~/types';
import { mapLimit, mapSeries } from 'async';
import chalk from 'chalk';
import { isEqual } from 'es-toolkit';
import { uniqueId } from 'es-toolkit/compat';
import figureSet from 'figures';
import { Text } from 'ink';
import { BoxSyntaxJS, TextTimer, toLineCols } from '~/components';
import { TASKS } from '~/configs';
import { Icon, Prefix, Status } from '~/types';
import { formatData } from '~/utils';
import { Base } from './base';
import { Log } from './log';
import { Task } from './task';
import { getGroupName } from './tasks.group';

export class Tasks<TTasksData extends any[] | readonly any[]>
  extends Base //
  implements BaseRunnable
{
  #tasks: Base[] = [];
  #title: TasksTitle<TTasksData>;
  #childrenStatus: Status[] = [];
  #dataCode: string | null = null;
  readonly #isShowTimer: boolean;
  readonly #isShowData: boolean;

  readonly #isShowAllFulfilled: boolean;
  readonly #isShowAllPending: boolean;

  readonly #isShowTaskAsGrid: boolean;
  readonly #gridWidth: number;

  isSealed: boolean = false;

  get #runnableTasks(): BaseRunnable[] {
    return this.#tasks.filter(task => task instanceof Task || task instanceof Tasks);
  }

  async onChange() {
    if (this.#isShowData) {
      const childrenStatus = this.#tasks //
        .filter(task => task instanceof Task)
        .map(task => task.status);
      if (!isEqual(this.#childrenStatus, childrenStatus)) {
        await this.parent.onChange();
        this.#dataCode = null;
        this.#dataCode = await formatData({ width: this.root.props?.width, level: this.level, data: this.data });
      }
    }

    await this.parent.onChange();
  }

  //! Getter & setter
  get response(): TasksResponse<TTasksData> {
    const records = this.#tasks //
      .filter(task => task instanceof Task)
      .map(task => task.response);
    return records as TasksResponse<TTasksData>;
  }

  get data(): TTasksData {
    const records = this.#tasks //
      .filter(task => task instanceof Task)
      .map(task => task.data);
    return records as TTasksData;
  }
  get statuses() {
    return this.#runnableTasks.reduce(
      (acc, task) => {
        switch (task.status) {
          case Status.Pending:
            acc.pending++;
            break;
          case Status.Running:
            acc.running++;
            break;
          case Status.Fulfilled:
            acc.fulfilled++;
            break;
          case Status.Rejected:
            acc.rejected++;
            break;
        }
        return acc;
      },
      { pending: 0, running: 0, fulfilled: 0, rejected: 0 },
    );
  }
  get status(): Status {
    const statuses = this.statuses;
    if (statuses.rejected > 0) return Status.Rejected;
    if (statuses.running > 0) return Status.Running;
    if (statuses.fulfilled > 0 && statuses.pending === 0 && statuses.running === 0) return Status.Fulfilled;
    return Status.Pending;
  }
  get isRunning(): boolean {
    return this.#runnableTasks.some(task => task.isRunning);
  }
  get startTime(): bigint | null {
    return this.#runnableTasks.reduce<bigint | null>((minValue, { startTime }) => {
      return minValue === null || (startTime && startTime < minValue) ? startTime : minValue;
    }, null);
  }

  get endTime(): bigint | null {
    return this.#runnableTasks.reduce<bigint | null>((minValue, { endTime }) => {
      return minValue === null || (endTime && endTime > minValue) ? endTime : minValue;
    }, null);
  }

  //? Title
  get title() {
    return this.#title;
  }
  set title(value: TasksTitle<TTasksData>) {
    this.#title = value;
    this.onChange();
  }

  constructor(
    parent: Base | IRootObject, //
    options: TasksOptions<TTasksData> = {},
  ) {
    super(parent);
    this.#title = options?.title ?? 'Tasks';

    this.#isShowData = options.isShowData ?? TASKS.isShowData;
    this.#isShowTimer = options.isShowTimer ?? TASKS.isShowTimer;

    this.#isShowAllFulfilled = options.isShowAllFulfilled ?? TASKS.isShowAllFulfilled;
    this.#isShowAllPending = options.isShowAllPending ?? TASKS.isShowAllPending;

    this.#isShowTaskAsGrid = options.isShowTaskAsGrid ?? TASKS.isShowTaskAsGrid;
    this.#gridWidth = options.gridWidth ?? TASKS.gridWidth;
  }

  //! ----- ----- ----- ----- ----- Run ----- ----- ----- ----- ----- !//
  //! Wait
  async wait(options: { concurrency?: number; isReturnOrThrow: false; isSealing?: boolean }): Promise<TasksResponse<TTasksData>>;
  async wait(options?: { concurrency?: number; isReturnOrThrow?: true; isSealing?: boolean }): Promise<TTasksData>;

  async wait(options: { concurrency?: number; isReturnOrThrow?: boolean; isSealing?: boolean } = {}): Promise<
    | TasksResponse<TTasksData> //
    | TTasksData
  > {
    const isReturnOrThrow = options.isReturnOrThrow ?? true;
    const concurrency = options.concurrency ?? TASKS.concurrency;
    const isSealing = options.isSealing ?? TASKS.isSealing;

    const pendingTasks = this.#runnableTasks.filter(task => task.status === Status.Pending);
    const runningTasks = this.#runnableTasks.filter(task => task.status === Status.Running);

    const pendingTasksIteratee: AsyncResultIteratorPromise<BaseRunnable, unknown> = async task => {
      try {
        await task.wait({ isReturnOrThrow: true });
      } catch (e) {
        if (isReturnOrThrow) throw e;
      }
    };
    const pendingPromise =
      concurrency > 1 //
        ? mapLimit<BaseRunnable, unknown>(pendingTasks, concurrency, pendingTasksIteratee)
        : mapSeries<BaseRunnable, unknown>(pendingTasks, pendingTasksIteratee);

    const runningPromise = new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (isReturnOrThrow) {
          const firstRejectedTask = (runningTasks as TaskResponse<any>[]) //
            .find((task): task is Extract<typeof task, { status: Status.Rejected }> => task.status === Status.Rejected);
          if (firstRejectedTask) {
            clearInterval(intervalId);
            return reject(firstRejectedTask.error);
          }
        }
        if (runningTasks.every(task => !task.isRunning)) {
          clearInterval(intervalId);
          resolve(null);
        }
      }, 50);
    });

    try {
      await Promise.all([pendingPromise, runningPromise]);
    } finally {
      if (isSealing) this.isSealed = true;
      await this.onChange(); // format data before sealing
    }

    if (isReturnOrThrow) {
      const firstRejectedTask = (this.response as TaskResponse<any>[]) //
        .find((task): task is Extract<typeof task, { status: Status.Rejected }> => task.status === Status.Rejected);
      if (firstRejectedTask) {
        throw firstRejectedTask.error;
      }
      return this.data;
    }
    return this.response;
  }

  //! ----- ----- ----- ----- ----- Children ----- ----- ----- ----- ----- !//
  //! Log
  log(props: Arrayable<LineColProps['text'] | LineColProps>, icon = Icon.Info) {
    if (this.isSealed) throw new Error('Tasks is already sealed');

    this.#tasks.push(new Log(this, props, icon));
    this.onChange();
    return this;
  }

  async logData<TCData>(data: TCData, icon = Icon.Info) {
    if (this.isSealed) throw new Error('Tasks is already sealed');

    const { level } = this;
    const code = await formatData({ width: this.root.props?.width, level, data });
    this.#tasks.push(new Log(this, <BoxSyntaxJS code={code} />, icon));
    this.onChange();
    return this;
  }

  //! Task
  task<TCData>(callback: TaskCallback<TCData>, options: TaskOptions<TCData> & { immediately: false }): Task<TCData>;
  task<TCData>(callback: TaskCallback<TCData>, options: TaskOptions<TCData> & { immediately?: true; isReturnOrThrow: false }): Promise<TaskResponse<TCData>>;
  task<TCData>(callback: TaskCallback<TCData>, options?: TaskOptions<TCData> & { immediately?: true; isReturnOrThrow?: true }): Promise<TCData>;

  task<TCData>(
    callback: TaskCallback<TCData>, //
    options: TaskOptions<TCData> & { immediately?: boolean; isReturnOrThrow?: boolean } = {},
  ): Task<TCData> | Promise<TCData | TaskResponse<TCData>> {
    const immediately = options.immediately ?? true;
    const isReturnOrThrow = options.isReturnOrThrow ?? true;

    if (this.isSealed) throw new Error('Tasks is already sealed');

    const task = new Task(this, callback, options);
    this.#tasks.push(task);

    if (immediately) {
      return (async () => {
        await this.onChange();
        if (isReturnOrThrow) {
          return task.wait({ isReturnOrThrow });
        } else {
          return task.wait({ isReturnOrThrow });
        }
      })();
    } else {
      this.onChange();
      return task;
    }
  }

  //! Tasks
  tasks<TCData extends any[] | readonly any[]>(callbacks: TasksCallback<TCData>, options: TasksOptionsExtra<TCData> & { immediately: false }): Tasks<TCData>;
  tasks<TCData extends any[] | readonly any[]>(callbacks: TasksCallback<TCData>, options: TasksOptionsExtra<TCData> & { immediately?: true; isReturnOrThrow: false }): Promise<TasksResponse<TCData>>;
  tasks<TCData extends any[] | readonly any[]>(callbacks: TasksCallback<TCData>, options?: TasksOptionsExtra<TCData> & { immediately?: true; isReturnOrThrow?: true }): Promise<TCData>;

  tasks<TCData extends any[]>(
    callbacks: TasksCallback<TCData>,
    options: TasksOptionsExtra<TCData> & { immediately?: boolean; isReturnOrThrow?: boolean } = {},
  ): Tasks<TCData> | Promise<TCData | TasksResponse<TCData>> {
    const immediately = options.immediately ?? true;
    const concurrency = options.concurrency;
    const isReturnOrThrow = options.isReturnOrThrow ?? true;
    const isSealing = options.isSealing ?? true;

    if (this.isSealed) throw new Error('Tasks is already sealed');

    const tasks = new Tasks<TCData>(this, options);
    this.#tasks.push(tasks);

    const tasksChildren = callbacks.map(callback => new Task(tasks, callback));
    tasks.#tasks.push(...tasksChildren);

    if (immediately) {
      return (async () => {
        await this.onChange();
        if (isReturnOrThrow) {
          return await tasks.wait({ concurrency, isReturnOrThrow, isSealing });
        } else {
          return await tasks.wait({ concurrency, isReturnOrThrow, isSealing });
        }
      })();
    } else {
      this.onChange();
      return tasks;
    }
  }

  //! ----- ----- ----- ----- ----- Convenience functions ----- ----- ----- ----- ----- !//

  /**
   * Convenience functions for @see {Tasks.tasks}
   */
  group(title: TasksTitle<void[]>, options?: Omit<TasksOptionsExtra<void[]>, 'title'>) {
    return this.tasks([], { immediately: false, title, ...options });
  }

  /**
   * Seal tasks if there're no running children tasks
   */
  end() {
    if (this.status !== Status.Fulfilled) {
      throw new Error('Cannot seal tasks!');
    }
    this.isSealed = true;
  }

  //! ----- ----- ----- ----- ----- Lines ----- ----- ----- ----- ----- !//
  private get titleCols() {
    return toLineCols(
      typeof this.title === 'function' //
        ? this.title(this.response)
        : this.title,
    );
  }

  get #middleLines(): LineProps[] {
    const tasksGroups: TaskGroup[] = [];
    let currentGroup: TaskGroup | null = null;
    let currentGroupName: string | null = null;

    for (const task of this.#tasks) {
      const groupName = getGroupName({ task, isShowTaskAsGrid: this.#isShowTaskAsGrid });

      if (currentGroup && isEqual(groupName, currentGroupName)) {
        currentGroup.tasks.push(task);
      } else {
        if (currentGroup) tasksGroups.push(currentGroup);
        currentGroup = { name: groupName, key: uniqueId(), tasks: [task] };
        currentGroupName = groupName;
      }
    }

    if (currentGroup) tasksGroups.push(currentGroup);

    return tasksGroups.flatMap(tasksGroup => {
      if (tasksGroup.name === 'task') {
        const tasksGroupStatus = tasksGroup.tasks
          .map(task => {
            if (task instanceof Task) {
              return {
                [Status.Pending]: chalk.gray(figureSet.squareLightShade), // ░
                [Status.Running]: chalk.white(figureSet.squareLightShade), // ░
                [Status.Fulfilled]: chalk.green(figureSet.square), // █
                [Status.Rejected]: chalk.red(figureSet.square), // █
              }[task.status];
            } /* v8 ignore next */
            return '?';
          })
          .join('');

        return {
          key: `${this.key}-${tasksGroup.key}-grid`,
          isStatic: this.isSealed,
          level: this.level + 1,
          prefix: Prefix.BlockMiddleLine,
          icon: this.isSealed ? Icon.Success : Icon.Running,
          colsLeft: [{ text: tasksGroupStatus, width: this.#gridWidth }],
          colsRight: [{ text: '', width: 'wrap' }],
        };
      }
      if (tasksGroup.name === `task-${Status.Fulfilled}` && !this.#isShowAllFulfilled) {
        return {
          key: `${this.key}-${tasksGroup.key}-fulfilled`,
          isStatic: this.isSealed,
          level: this.level + 1,
          prefix: Prefix.BlockMiddleLine,
          icon: this.isSealed ? Icon.Success : Icon.Running,
          colsLeft: [
            this.isSealed //
              ? { text: `${tasksGroup.tasks.length} completed tasks!`, color: 'green' }
              : { text: `${tasksGroup.tasks.length} completed tasks...`, color: 'yellow' },
          ],
        };
      }
      if (tasksGroup.name === `task-${Status.Pending}` && !this.#isShowAllPending) {
        return {
          key: `${this.key}-${tasksGroup.key}-pending`,
          isStatic: this.isSealed,
          level: this.level + 1,
          prefix: Prefix.BlockMiddleLine,
          icon: Icon.Pending,
          colsLeft: [{ text: `${tasksGroup.tasks.length} pending tasks...`, color: 'gray' }],
          colsRight: [{ text: 'Pending', color: 'gray', width: 'no-wrap' }],
        };
      }
      return tasksGroup.tasks.flatMap(task => task.toLines());
    });
  }

  toLines(): LineProps[] {
    //? Timer
    const { startTime, endTime } = this;
    const colTimer: LineColProps = startTime
      ? {
          text: (
            <TextTimer
              startTime={startTime}
              endTime={endTime ?? undefined} //
              color={this.status === Status.Fulfilled ? 'green' : 'gray'}
            />
          ),
        }
      : { text: 'Pending', color: 'gray', width: 'no-wrap' };

    //? Result
    const colResult: LineColProps[] = [
      { text: '=>', color: 'gray', width: 'no-wrap' },
      this.#isShowData
        ? this.#dataCode
          ? { text: <BoxSyntaxJS code={this.#dataCode} /> }
          : { text: <Text color="gray">...</Text> }
        : { text: <Text color="gray">Count = {chalk.yellow(this.#tasks.filter(task => task instanceof Task).length)}</Text> },
    ];

    return [
      {
        key: `${this.key}-start`,
        isStatic: !this.#isShowTimer || this.isSealed,
        level: this.level + 1,
        prefix: Prefix.BlockStart,
        colsLeft: this.titleCols,
        colsRight: !this.#isShowTimer ? [] : [colTimer],
      },
      ...this.#middleLines,
      {
        key: `${this.key}-end`,
        isStatic: this.isSealed,
        level: this.level + 1,
        prefix: Prefix.BlockEnd,
        colsLeft: colResult,
      },
    ];
  }
}
