import type { IsTuple } from '@culur/types';
import type { TaskResponse } from './task';
import type { LineColsProps } from '~/components';

//! Data => Response
export type TasksSimpleResponse<TItems extends readonly any[] | any[]> =
  IsTuple<TItems> extends true
    ? TItems extends readonly [infer Head, ...infer Rest]
      ? [TaskResponse<Head>, ...TasksSimpleResponse<Rest>]
      : []
    : TaskResponse<TItems[number]>[];

//! Data => Title
export type TasksSimpleTitle<TData extends readonly any[] | any[]> =
  | LineColsProps //
  | ((response: TasksSimpleResponse<TData>) => LineColsProps);

//! Options
export interface TasksSimpleOptions<TData extends readonly any[] | any[]> {
  title?: TasksSimpleTitle<TData>;
  isShowTimer?: boolean;
  isShowGridAfterFulfilled?: boolean;

  gridWidth?: number;
  concurrency?: number;

  isSealing?: boolean;
}
