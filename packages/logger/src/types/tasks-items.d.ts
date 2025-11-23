import type { IsTuple } from '@culur/types';
import type { TaskCallback } from './task.d';

//! Callback => Data
export type TasksItem<
  TCallbacks extends readonly TaskCallback<any>[] | TaskCallback<any>[],
> =
  IsTuple<TCallbacks> extends true
    ? TCallbacks extends readonly [infer Head, ...infer Rest]
      ? [
          Head extends TaskCallback<infer TItem> ? TItem : never,
          ...TasksItem<Rest>,
        ]
      : []
    : TCallbacks extends TaskCallback<infer FItem>[]
      ? FItem[]
      : [];
