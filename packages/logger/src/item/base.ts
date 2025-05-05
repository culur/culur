import type { TaskResponse } from '../types/task';
import type { LineProps } from '~/components/line';
import type { Status } from '~/types';

export interface BaseRunnable {
  get isRunning(): boolean;
  get startTime(): bigint | null;
  get endTime(): bigint | null;
  get status(): Status | null;

  wait: (options: { stopOnError?: true }) => Promise<unknown>;
  get response(): TaskResponse<unknown> | TaskResponse<unknown>[] | readonly TaskResponse<unknown>[];
}

export interface IBaseRoot {
  onChange: () => void;
  level: number;
}

export abstract class Base {
  protected readonly parent: Base | IBaseRoot;
  readonly level: number;

  constructor(parent: Base | IBaseRoot) {
    this.parent = parent;
    this.level = parent.level + 1;
  }

  onChange() {
    this.parent.onChange();
  }

  abstract toLines(...args: unknown[]): LineProps[];
}
