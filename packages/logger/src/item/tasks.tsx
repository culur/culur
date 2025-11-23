import type { Arrayable } from '@culur/types';
import type { AsyncResultIteratorPromise } from 'async';
import type { BaseRunnable, IRootObject } from './base';
import type { TaskGroup } from './tasks.group';
import type { LineColProps, LineProps } from '~/components';
import type { TaskCallback, TaskOptions, TaskResponse, TasksItem, TasksOptions, TasksResponse, TasksTitle } from '~/types';
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

export class Tasks<TItems extends any[]>
  extends Base //
  implements BaseRunnable
{
  #tasks: Base[] = [];
  #title: TasksTitle<TItems>;
  #childrenStatus: Status[] = [];
  #dataCode: string | null = null;
  readonly #isShowTimer: boolean;
  readonly #isShowData: boolean;

  readonly #isShowAllFulfilled: boolean;
  readonly #isShowAllPending: boolean;

  readonly #isShowTaskAsGrid: boolean;
  readonly #gridWidth: number;

  #concurrency: number;

  isSealed: boolean = false;

  _pushTasks(...items: Base[]) {
    this.#tasks.push(...items);
  }
  get #runnableTasks(): BaseRunnable[] {
    return this.#tasks.filter(task => task instanceof Task || task instanceof Tasks);
  }

  async onChange() {
    if (this.#isShowData) {
      const childrenStatus = this.#tasks //
        .filter(task => task instanceof Task)
        .map(task => task.status);
      /* v8 ignore else -- @preserve */
      if (!isEqual(this.#childrenStatus, childrenStatus)) {
        await this.parent.onChange();
        this.#dataCode = null;
        this.#dataCode = await formatData({ width: this.root.props?.width, level: this.level, data: this.data });
      }
    }

    await this.parent.onChange();
  }

  //! Getter & setter
  get response(): TasksResponse<TItems> {
    const records = this.#tasks //
      .filter(task => task instanceof Task)
      .map(task => task.response);
    return records;
  }
  get error(): Error | null {
    return [...this.response].reduce(
      (acc, item) => {
        if (acc) return acc;
        if (item.status === Status.Rejected) return item.error;
        return acc;
      },
      null as null | Error,
    );
  }

  get data(): TItems {
    const records = this.#tasks //
      .filter(task => task instanceof Task)
      .map(task => task.data);
    return records as TItems;
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
  set title(value: TasksTitle<TItems>) {
    this.#title = value;
    this.onChange();
  }

  constructor(
    parent: Base | IRootObject, //
    options: Omit<TasksOptions<TItems>, 'isSealing'> = {},
  ) {
    super(parent);
    this.#title = options?.title ?? 'Tasks';

    this.#isShowData = options.isShowData ?? TASKS.isShowData;
    this.#isShowTimer = options.isShowTimer ?? TASKS.isShowTimer;

    this.#isShowAllFulfilled = options.isShowAllFulfilled ?? TASKS.isShowAllFulfilled;
    this.#isShowAllPending = options.isShowAllPending ?? TASKS.isShowAllPending;

    this.#isShowTaskAsGrid = options.isShowTaskAsGrid ?? TASKS.isShowTaskAsGrid;
    this.#gridWidth = options.gridWidth ?? TASKS.gridWidth;

    this.#concurrency = options.concurrency ?? TASKS.concurrency;
  }

  //! ----- ----- ----- ----- ----- Run ----- ----- ----- ----- ----- !//
  //! Wait
  async wait(options: { concurrency?: number; isReturnOrThrow: false; isSealing?: boolean }): Promise<TasksResponse<TItems>>;
  async wait(options?: { concurrency?: number; isReturnOrThrow?: true; isSealing?: boolean }): Promise<TItems>;

  async wait(options: { concurrency?: number; isReturnOrThrow?: boolean; isSealing?: boolean } = {}): Promise<
    | TasksResponse<TItems> //
    | TItems
  > {
    this.#concurrency = options.concurrency ?? this.#concurrency;
    const isReturnOrThrow = options.isReturnOrThrow ?? true;
    const isSealing = options.isSealing ?? TASKS.isSealing;

    const pendingTasks = this.#runnableTasks.filter(task => task.status === Status.Pending);
    const runningTasks = this.#runnableTasks.filter(task => task.status === Status.Running);

    const pendingTasksIteratee: AsyncResultIteratorPromise<BaseRunnable, unknown> = async task => {
      try {
        await task.wait({ isReturnOrThrow: true });
      } catch (e) {
        /* v8 ignore else -- @preserve */
        if (isReturnOrThrow) throw e;
      }
    };
    const pendingPromise =
      this.#concurrency > 1 //
        ? mapLimit<BaseRunnable, unknown>(pendingTasks, this.#concurrency, pendingTasksIteratee)
        : mapSeries<BaseRunnable, unknown>(pendingTasks, pendingTasksIteratee);

    const runningPromise = new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (isReturnOrThrow) {
          const firstRejectedTask = runningTasks //
            .find(task => task.status === Status.Rejected);
          if (firstRejectedTask) {
            clearInterval(intervalId);
            return reject(firstRejectedTask.error);
          }
        }
        /* v8 ignore else -- @preserve */
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
        .find((response): response is Extract<typeof response, { status: Status.Rejected }> => response.status === Status.Rejected);
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

    this._pushTasks(new Log(this, props, icon));
    this.onChange();
    return this;
  }

  async logData<TCData>(data: TCData, icon = Icon.Info) {
    if (this.isSealed) throw new Error('Tasks is already sealed');

    const { level } = this;
    const code = await formatData({ width: this.root.props?.width, level, data });
    this._pushTasks(new Log(this, <BoxSyntaxJS code={code} />, icon));
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
  ): Task<TCData> | Promise<TCData> | Promise<TaskResponse<TCData>> {
    const immediately = options.immediately ?? true;
    const isReturnOrThrow = options.isReturnOrThrow ?? true;

    if (this.isSealed) throw new Error('Tasks is already sealed');

    const task = new Task(this, callback, options);
    this._pushTasks(task);

    if (immediately && isReturnOrThrow) {
      return (async () => {
        await this.onChange();
        return await task.wait({ isReturnOrThrow });
      })();
    } else if (immediately && !isReturnOrThrow) {
      return (async () => {
        await this.onChange();
        return await task.wait({ isReturnOrThrow });
      })();
    } else {
      this.onChange();
      return task;
    }
  }

  //! Tasks
  tasks<TCallbacks extends readonly TaskCallback<any>[] | TaskCallback<any>[]>(callbacks: TCallbacks, options: TasksOptions<TasksItem<TCallbacks>> & { immediately: false }): Tasks<TasksItem<TCallbacks>>;
  tasks<TCallbacks extends readonly TaskCallback<any>[] | TaskCallback<any>[]>(callbacks: TCallbacks, options: TasksOptions<TasksItem<TCallbacks>> & { immediately?: true; isReturnOrThrow: false }): Promise<TasksResponse<TasksItem<TCallbacks>>>;
  tasks<TCallbacks extends readonly TaskCallback<any>[] | TaskCallback<any>[]>(callbacks: TCallbacks, options?: TasksOptions<TasksItem<TCallbacks>> & { immediately?: true; isReturnOrThrow?: true }): Promise<TasksItem<TCallbacks>>;

  tasks<TCallbacks extends readonly TaskCallback<any>[] | TaskCallback<any>[]>(
    callbacks: TCallbacks,
    options: TasksOptions<TasksItem<TCallbacks>> & { immediately?: boolean; isReturnOrThrow?: boolean } = {},
  ): Tasks<TasksItem<TCallbacks>> | Promise<TasksItem<TCallbacks>> | Promise<TasksResponse<TasksItem<TCallbacks>>> {
    const immediately = options.immediately ?? true;
    const isReturnOrThrow = options.isReturnOrThrow ?? true;
    const isSealing = options.isSealing ?? true;

    if (this.isSealed) throw new Error('Tasks is already sealed');

    const tasks = new Tasks<TasksItem<TCallbacks>>(this, options);
    this._pushTasks(tasks);

    const tasksChildren = callbacks.map(callback => new Task(tasks, callback));
    tasks._pushTasks(...tasksChildren);

    if (immediately && isReturnOrThrow) {
      return (async () => {
        await this.onChange();
        return await tasks.wait({ isReturnOrThrow, isSealing });
      })();
    } else if (immediately && !isReturnOrThrow) {
      return (async () => {
        await this.onChange();
        return await tasks.wait({ isReturnOrThrow, isSealing });
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
  group(title: TasksTitle<void[]>, options?: Omit<TasksOptions<void[]>, 'title'>) {
    return this.tasks<(() => void)[]>([], { immediately: false, title, ...options });
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
            /* v8 ignore else -- @preserve */
            if (task instanceof Task) {
              return {
                [Status.Pending]: chalk.gray(figureSet.squareLightShade), // ░
                [Status.Running]: chalk.white(figureSet.squareLightShade), // ░
                [Status.Fulfilled]: chalk.green(figureSet.square), // █
                [Status.Rejected]: chalk.red(figureSet.square), // █
              }[task.status];
            }
            /* v8 ignore next -- @preserve */
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
