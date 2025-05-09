import type { Task } from '../item/task';
import type { LineColsProps } from '~/components';
import type { Status } from '~/types';

//! Data => Callback
export type TaskCallback<TData> = //
  (this: Task<TData>) => TData | Promise<TData>;

//! Data => Response
export type TaskResponse<TData> =
  | { status: Status.Pending }
  | { status: Status.Running; startTime: bigint }
  | {
      status: Status.Fulfilled;
      startTime: bigint;
      endTime: bigint;
      data: TData;
      dataCode: string;
    }
  | {
      status: Status.Rejected;
      startTime: bigint;
      endTime: bigint;
      error: Error;
    };

//! Data => Title
export type TaskTitle<TData> =
  | LineColsProps //
  | ((response: TaskResponse<TData>) => LineColsProps);

export interface TaskOptions<TData> {
  title?: TaskTitle<TData>;
  isShowData?: boolean;
  isShowError?: boolean;
  isShowErrorStack?: boolean;
}
