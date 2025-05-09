import type { TaskCallback, TaskResponse } from './task';
import type { LineColsProps } from '~/components';

//! Data => Callback
export type TasksCallback<TData extends readonly any[]> = {
  [K in keyof TData]: TaskCallback<TData[K]>;
};

//! Data => Response
export type TasksResponse<TData extends readonly any[]> = {
  [K in keyof TData]: TaskResponse<TData[K]>;
};

//! Data => Title
export type TasksTitle<TData extends readonly any[]> =
  | LineColsProps //
  | ((response: TasksResponse<TData>) => LineColsProps);

//! Options
export interface TasksOptions<TData extends readonly any[]> {
  title?: TasksTitle<TData>;
  isShowTimer?: boolean;
  isShowData?: boolean;

  isShowAllFulfilled?: boolean;
  isShowAllPending?: boolean;

  isShowTaskAsGrid?: boolean;
  gridWidth?: number;
}

export interface TasksOptionsExtra<TData extends readonly any[]>
  extends TasksOptions<TData> {
  concurrency?: number;
  isSealing?: boolean;
}
