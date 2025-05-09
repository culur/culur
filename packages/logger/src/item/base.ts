import type { BoxProps } from 'ink';
import type { TaskResponse } from '../types/task';
import type { LineProps } from '~/components/line';
import type { Status } from '~/types';
import { uniqueId } from 'lodash-es';

export interface BaseRunnable {
  get isRunning(): boolean;
  get startTime(): bigint | null;
  get endTime(): bigint | null;
  get status(): Status | null;

  wait: (options: { isReturnOrThrow?: true }) => Promise<unknown>;
  get response(): TaskResponse<unknown> | TaskResponse<unknown>[] | readonly TaskResponse<unknown>[];
}

export interface IRootObject {
  onChange: () => void;
  level: number;
  props?: Omit<BoxProps, 'width'> & { width?: number };
}

export abstract class Base {
  protected readonly parent: Base | IRootObject;
  protected readonly root: IRootObject;
  readonly level: number;
  readonly key: string;

  constructor(parent: Base | IRootObject) {
    this.parent = parent;
    this.root = 'root' in parent ? parent.root : parent;
    this.level = parent.level + 1;
    this.key = uniqueId();
  }

  async onChange() {
    await this.parent.onChange();
  }

  abstract toLines(): LineProps[];
}
