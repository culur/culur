import type { Task } from '../item/task';
import type { LineColsProps } from '~/components';
import type { Status } from '~/types';

//! Data => Callback
export type TaskCallback<TItem> = //
  (this: Task<TItem>) => TItem | Promise<TItem>;

//! Data => Response
export type TaskResponse<TItem> =
  | { status: Status.Pending }
  | { status: Status.Running; startTime: bigint }
  | {
      status: Status.Fulfilled;
      startTime: bigint;
      endTime: bigint;
      data: TItem;
      dataCode: string;
    }
  | {
      status: Status.Rejected;
      startTime: bigint;
      endTime: bigint;
      error: Error;
    };

//! Data => Title
export type TaskTitle<TItem> =
  | LineColsProps //
  | ((response: TaskResponse<TItem>) => LineColsProps);

export interface TaskOptions<TItem> {
  title?: TaskTitle<TItem>;
  isShowData?: boolean;
  isShowError?: boolean;
  isShowErrorStack?: boolean;
}
