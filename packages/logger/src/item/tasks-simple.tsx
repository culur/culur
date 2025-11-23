import type { AsyncResultIteratorPromise } from 'async';
import type { BaseRunnable, IRootObject } from './base';
import type { LineColProps, LineProps } from '~/components';
import type { TaskCallback, TaskOptions, TaskResponse, TasksSimpleOptions, TasksSimpleResponse, TasksSimpleTitle } from '~/types';
import { mapLimit, mapSeries } from 'async';
import chalk from 'chalk';
import figureSet from 'figures';
import { TextTimer, toLineCols } from '~/components';
import { TASKS } from '~/configs';
import { Icon, Prefix, Status } from '~/types';
import { Base } from './base';
import { Task } from './task';

export class TasksSimple<TItems extends readonly any[] | any[]>
  extends Base //
  implements BaseRunnable
{
  #tasks: Task<any>[] = [];
  #title: TasksSimpleTitle<TItems[]>;
  readonly #isShowTimer: boolean;
  readonly #gridWidth: number;

  #concurrency: number;

  isSealed: boolean = false;

  _pushTasks(...items: Task<any>[]) {
    this.#tasks.push(...items);
  }
  get #runnableTasks(): Task<any>[] {
    return this.#tasks;
  }

  async onChange() {
    await this.parent.onChange();
  }

  //! Getter & setter
  get response(): TasksSimpleResponse<TItems> {
    const records = this.#tasks //
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
      .map(task => task.data)
      .filter(data => data !== null);
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
  set title(value: TasksSimpleTitle<TItems>) {
    this.#title = value;
    this.onChange();
  }

  constructor(
    parent: Base | IRootObject, //
    options: Omit<TasksSimpleOptions<TItems>, 'isSealing'> = {},
  ) {
    super(parent);
    this.#title = options?.title ?? 'Tasks';

    this.#isShowTimer = options.isShowTimer ?? TASKS.isShowTimer;
    this.#gridWidth = options.gridWidth ?? TASKS.gridWidth;

    this.#concurrency = options.concurrency ?? TASKS.concurrency;
  }

  //! ----- ----- ----- ----- ----- Run ----- ----- ----- ----- ----- !//
  //! Wait
  async wait(options: { concurrency?: number; isReturnOrThrow: false; isSealing?: boolean }): Promise<TasksSimpleResponse<TItems>>;
  async wait(options?: { concurrency?: number; isReturnOrThrow?: true; isSealing?: boolean }): Promise<TItems>;

  async wait(options: { concurrency?: number; isReturnOrThrow?: boolean; isSealing?: boolean } = {}): Promise<
    | TasksSimpleResponse<TItems> //
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
    this.#tasks.push(task);

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

  //! ----- ----- ----- ----- ----- Convenience functions ----- ----- ----- ----- ----- !//
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
    const tasksStatus = this.#tasks
      .map(task => {
        return {
          [Status.Pending]: chalk.gray(figureSet.squareLightShade), // ░
          [Status.Running]: chalk.white(figureSet.squareLightShade), // ░
          [Status.Fulfilled]: chalk.green(figureSet.square), // █
          [Status.Rejected]: chalk.red(figureSet.square), // █
        }[task.status];
      })
      .join('');

    return [
      {
        key: `${this.key}-grid`,
        isStatic: this.isSealed,
        level: this.level,
        icon: Icon.Space,
        prefix: Prefix.BlockMiddleNone,
        colsLeft: [{ text: tasksStatus, width: this.#gridWidth }],
        colsRight: [{ text: '', width: 'wrap' }],
      },
    ];
  }

  toLines(): LineProps[] {
    // ? Timer
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

    const icon = {
      [Status.Pending]: Icon.Pending,
      [Status.Running]: Icon.Running,
      [Status.Fulfilled]: Icon.Success,
      [Status.Rejected]: Icon.Error,
    }[this.status];

    return [
      {
        key: `${this.key}-start`,
        isStatic: this.isSealed,
        level: this.level,
        prefix: Prefix.BlockMiddleLine,
        icon,
        colsLeft: this.titleCols,
        colsRight: !this.#isShowTimer ? [] : [colTimer],
      },
      ...this.#middleLines,
    ];
  }
}
