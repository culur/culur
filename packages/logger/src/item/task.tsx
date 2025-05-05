import type { BaseRunnable } from './base';
import type { LineProps } from '~/components';
import type { TaskCallback, TaskOptions, TaskResponse, TaskTitle } from '~/types';
import { hrtime } from 'node:process';
import { BoxData, TextTimer, toLineCols } from '~/components';
import { TASK } from '~/configs';
import { Icon, Prefix, Status } from '~/types';
import { Base } from './base';

export class Task<TData>
  extends Base //
  implements BaseRunnable
{
  static readonly #RESPONSE_PENDING = { status: Status.Pending } as const;

  readonly #callback: TaskCallback<TData>;
  #response: TaskResponse<TData> = Task.#RESPONSE_PENDING;
  #title: TaskTitle<TData>;
  readonly #isShowErrorStack: boolean;
  readonly #isShowData: boolean;
  readonly #isShowError: boolean;

  //! Getter & setter
  get response() {
    return this.#response;
  }
  private set response(response: TaskResponse<TData>) {
    this.#response = response;
    this.onChange();
  }
  get data() {
    return this.#response.status === Status.Fulfilled ? this.#response.data : null;
  }
  get status() {
    return this.#response.status;
  }
  get isRunning() {
    return this.#response.status === Status.Pending || this.#response.status === Status.Running;
  }
  get startTime() {
    return 'startTime' in this.#response ? this.#response.startTime : null;
  }
  get endTime() {
    return 'endTime' in this.#response ? this.#response.endTime : null;
  }

  //? Title
  get title() {
    return this.#title;
  }
  set title(value: TaskTitle<TData>) {
    this.#title = value;
    this.onChange();
  }

  constructor(
    parent: Base, //
    callback: TaskCallback<TData>,
    options: TaskOptions<TData> = {},
  ) {
    super(parent);
    this.#callback = callback;
    this.#title = options.title ?? (callback.name || 'Anonymous');
    this.#isShowData = options.isShowData ?? TASK.isShowData;
    this.#isShowError = options.isShowError ?? TASK.isShowError;
    this.#isShowErrorStack = options.isShowErrorStack ?? TASK.isShowErrorStack;
  }

  //! Wait
  async wait(): Promise<TData>;
  async wait(options: { stopOnError: false }): Promise<TaskResponse<TData>>;
  async wait(options: { stopOnError?: true }): Promise<TData>;
  async wait(options: { stopOnError?: boolean } = {}): Promise<TData | TaskResponse<TData>> {
    const { stopOnError = true } = options;

    const startTime = hrtime.bigint();
    this.response = { status: Status.Running, startTime };

    try {
      const data = await this.#callback();
      const endTime = hrtime.bigint();
      this.response = { status: Status.Fulfilled, startTime, endTime, data };
      if (stopOnError) return data;
      return this.response;
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      const endTime = hrtime.bigint();
      this.response = { status: Status.Rejected, error, startTime, endTime };
      if (stopOnError) throw e;
      return this.response;
    }
  }

  //! Lines
  private get titleCols() {
    return toLineCols(
      typeof this.title === 'function' //
        ? this.title(this.response)
        : this.title,
    );
  }

  toLines(): LineProps[] {
    switch (this.#response.status) {
      case Status.Pending:
        return [
          {
            level: this.level,
            prefix: Prefix.BlockMiddleLine,
            icon: Icon.Pending,
            colsLeft: this.titleCols,
            colsRight: [{ text: 'Pending', color: 'gray', width: 'no-wrap' }],
          },
        ];
      case Status.Running:
        return [
          {
            level: this.level,
            prefix: Prefix.BlockMiddleLine,
            icon: Icon.Running,
            colsLeft: this.titleCols,
            colsRight: [{ text: <TextTimer {...this.#response} color="yellow" /> }],
          },
        ];
      case Status.Fulfilled: {
        const result = this.#response;
        const resultLines = (): LineProps[] => {
          if (!this.#isShowData) return [];
          return [
            {
              level: this.level,
              prefix: Prefix.BlockMiddleNone,
              icon: Icon.Space,
              colsLeft: [
                { text: '=>', color: 'gray', width: 'no-wrap' },
                { text: <BoxData data={result.data} /> }, //
              ],
            },
          ];
        };

        return [
          {
            level: this.level,
            prefix: Prefix.BlockMiddleLine,
            icon: Icon.Success,
            colsLeft: this.titleCols,
            colsRight: [{ text: <TextTimer {...result} color="green" /> }],
          },
          ...resultLines(),
        ];
      }
      case Status.Rejected:
      default: {
        const result = this.#response;
        const errorLines = (): LineProps[] => {
          if (!this.#isShowError) return [];

          return [
            {
              level: this.level,
              prefix: Prefix.BlockMiddleNone,
              icon: Icon.Space,
              colsLeft: [
                { text: '=>', color: 'gray', width: 'no-wrap' },
                {
                  text: this.#isShowErrorStack //
                    ? (result.error.stack || `Error: ${result.error.message}`).replace(/^\s+at/gm, '  at')
                    : String(result.error),
                  color: 'red',
                },
              ],
            },
          ];
        };

        return [
          {
            level: this.level,
            prefix: Prefix.BlockMiddleLine,
            icon: Icon.Error,
            colsLeft: this.titleCols,
            colsRight: [{ text: <TextTimer {...result} color="red" /> }],
          },
          ...errorLines(),
        ];
      }
    }
  }
}
