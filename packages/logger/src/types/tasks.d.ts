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
export type TasksParams<
  TData extends any[] | readonly any[], //
  TExtraOptions,
  TRequired extends 'required' | 'optional' = 'required',
> = TRequired extends 'required'
  ? [
      callbacks: TasksCallback<TData>, //
      options: TasksOptionsExtra<TData> & TExtraOptions,
    ]
  : [
      callbacks: TasksCallback<TData>, //
      options?: TasksOptionsExtra<TData> & TExtraOptions,
    ];

export interface TasksOptions<TData extends readonly any[]> {
  title?: TasksTitle<TData>;
  isShowData?: boolean;
}
export interface TasksOptionsExtra<TData extends readonly any[]>
  extends TasksOptions<TData> {
  concurrency?: number;
}
