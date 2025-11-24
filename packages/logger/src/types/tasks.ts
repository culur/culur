import type { IsTuple } from '@culur/types';
import type { TaskResponse } from './task';
import type { LineColsProps } from '~/components';

//! Data => Response
export type TasksResponse<TItems extends readonly any[] | any[]> =
  IsTuple<TItems> extends true
    ? TItems extends readonly [infer Head, ...infer Rest]
      ? [TaskResponse<Head>, ...TasksResponse<Rest>]
      : []
    : TaskResponse<TItems[number]>[];

//! Data => Title
export type TasksTitle<TItems extends readonly any[] | any[]> =
  | LineColsProps //
  | ((response: TasksResponse<TItems>) => LineColsProps);

//! Options
export interface TasksOptions<TItems extends readonly any[] | any[]> {
  title?: TasksTitle<TItems>;
  isShowTimer?: boolean;
  isShowData?: boolean;

  isShowAllFulfilled?: boolean;
  isShowAllPending?: boolean;

  isShowTaskAsGrid?: boolean;
  gridWidth?: number;
  concurrency?: number;

  isSealing?: boolean;
}
