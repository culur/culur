import type { AsyncResultIteratorPromise } from 'async';
import type { Arrayable } from 'type-fest';
import type { TasksOptions, TasksParams, TasksResponse, TasksTitle } from '../types/tasks';
import type { BaseRunnable, IRootObject } from './base';
import type { LineColProps, LineProps } from '~/components';
import type { TaskCallback, TaskOptions, TaskParams, TaskResponse } from '~/types';
import { mapLimit, mapSeries } from 'async';
import chalk from 'chalk';
import { Text } from 'ink';
import { isEqual } from 'lodash-es';
import { BoxSyntaxJS, TextTimer, toLineCols } from '~/components';
import { TASKS } from '~/configs';
import { Icon, Prefix, Status } from '~/types';
import { formatData } from '~/utils';
import { Base } from './base';
import { Log } from './log';
import { Task } from './task';

export class Tasks<TTasksData extends any[] | readonly any[]>
  extends Base //
  implements BaseRunnable
{
  #tasks: Base[] = [];
  #title: TasksTitle<TTasksData>;
  #childrenStatus: Status[] = [];
  #dataCode: string | null = null;
  readonly #isShowData: boolean;
  sealed: boolean = false;

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
  }

  //! ----- ----- ----- ----- ----- Run ----- ----- ----- ----- ----- !//
  //! Wait
  async wait(options: { concurrency?: number; stopOnError: false; seal?: boolean }): Promise<TasksResponse<TTasksData>>;
  async wait(options?: { concurrency?: number; stopOnError?: true; seal?: boolean }): Promise<TTasksData>;

  async wait(options: { concurrency?: number; stopOnError?: boolean; seal?: boolean } = {}): Promise<
    | TasksResponse<TTasksData> //
    | TTasksData
  > {
    const { stopOnError = true, concurrency = TASKS.tasksConcurrency, seal = true } = options;

    const pendingTasks = this.#runnableTasks.filter(task => task.status === Status.Pending);
    const runningTasks = this.#runnableTasks.filter(task => task.status === Status.Running);

    const pendingTasksIteratee: AsyncResultIteratorPromise<BaseRunnable, unknown> = async task => {
      try {
        await task.wait({ stopOnError: true });
      } catch (e) {
        if (stopOnError) throw e;
      }
    };
    const pendingPromise =
      concurrency > 1 //
        ? mapLimit<BaseRunnable, unknown>(pendingTasks, concurrency, pendingTasksIteratee)
        : mapSeries<BaseRunnable, unknown>(pendingTasks, pendingTasksIteratee);

    const runningPromise = new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (stopOnError) {
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
      await this.onChange(); // format data before seal
      if (seal) this.sealed = true;
    }

    if (stopOnError) {
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
    if (this.sealed) throw new Error('Tasks is already sealed');

    this.#tasks.push(new Log(this, props, icon));
    this.onChange();
    return this;
  }

  async logData<TCData>(data: TCData, icon = Icon.Info) {
    if (this.sealed) throw new Error('Tasks is already sealed');

    const { level } = this;
    const code = await formatData({ width: this.root.props?.width, level, data });
    this.#tasks.push(new Log(this, <BoxSyntaxJS code={code} />, icon));
    this.onChange();
    return this;
  }

  //! Task
  task<TCData>(..._: TaskParams<TCData, { immediately: false }>): Task<TCData>;
  task<TCData>(..._: TaskParams<TCData, { immediately?: true; stopOnError: false }>): Promise<TaskResponse<TCData>>;
  task<TCData>(..._: TaskParams<TCData, { immediately?: true; stopOnError?: true }, 'optional'>): Promise<TCData>;

  task<TCData>(
    callback: TaskCallback<TCData>,
    {
      immediately = true,
      stopOnError = true,
      ...options
    }: TaskOptions<TCData> & {
      immediately?: boolean;
      stopOnError?: boolean;
    } = {},
  ): Task<TCData> | Promise<TCData | TaskResponse<TCData>> {
    if (this.sealed) throw new Error('Tasks is already sealed');

    const task = new Task(this, callback, options);
    this.#tasks.push(task);
    this.onChange();

    if (immediately) {
      return new Promise((resolve, reject) => {
        if (stopOnError) {
          task.wait({ stopOnError }).then(resolve).catch(reject);
        } else {
          task.wait({ stopOnError }).then(resolve);
        }
      });
    } else {
      return task;
    }
  }

  //! Tasks
  tasks<TCData extends any[] | readonly any[]>(..._: TasksParams<TCData, { immediately: false }>): Tasks<TCData>;
  tasks<TCData extends any[] | readonly any[]>(..._: TasksParams<TCData, { immediately?: true; stopOnError: false }>): Promise<TasksResponse<TCData>>;
  tasks<TCData extends any[] | readonly any[]>(..._: TasksParams<TCData, { immediately?: true; stopOnError?: true }, 'optional'>): Promise<TCData>;

  tasks<TCData extends any[]>(
    ...[
      callbacks,
      {
        immediately = true, //
        concurrency,
        stopOnError = true,
        seal = true,
        ...options
      } = {},
    ]: TasksParams<TCData, { immediately?: boolean; stopOnError?: boolean }, 'optional'>
  ): Tasks<TCData> | Promise<TCData | TasksResponse<TCData>> {
    if (this.sealed) throw new Error('Tasks is already sealed');

    const tasks = new Tasks<TCData>(this, options);
    this.#tasks.push(tasks);
    this.onChange();

    for (const callback of callbacks) {
      tasks.task(callback, { immediately: false });
    }

    if (immediately) {
      return new Promise((resolve, reject) => {
        if (stopOnError) {
          tasks.wait({ concurrency, stopOnError, seal }).then(resolve).catch(reject);
        } else {
          tasks.wait({ concurrency, stopOnError, seal }).then(resolve);
        }
      });
    } else {
      return tasks;
    }
  }

  //! ----- ----- ----- ----- ----- Lines ----- ----- ----- ----- ----- !//
  private get titleCols() {
    return toLineCols(
      typeof this.title === 'function' //
        ? this.title(this.response)
        : this.title,
    );
  }

  toLines(): LineProps[] {
    const middleLines = this.#tasks.flatMap(task => {
      if (task instanceof Log) {
        return task.toLines();
      }
      if (task instanceof Task) {
        return task.toLines();
      }
      if (task instanceof Tasks) {
        return task.toLines();
      } /* v8 ignore next */
      return [];
    });

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
        isStatic: this.level === 0, // Root header is static
        level: this.level + 1,
        prefix: Prefix.BlockStart,
        colsLeft: this.titleCols,
        colsRight: this.level === 0 ? [] : [colTimer], // Root header don't have timer
      },
      ...middleLines,
      {
        key: `${this.key}-end`,
        isStatic: this.sealed,
        level: this.level + 1,
        prefix: Prefix.BlockEnd,
        colsLeft: colResult,
      },
    ];
  }
}
