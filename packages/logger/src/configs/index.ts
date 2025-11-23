import type { TaskOptions, TasksOptions } from '~/types';

export const TASK = {
  isShowData: false,
  isShowErrorStack: false,
  isShowError: false,
} as const satisfies Omit<TaskOptions<unknown>, 'title'>;

export const TASKS = {
  isShowTimer: false,
  isShowData: false,

  isShowAllFulfilled: true,
  isShowAllPending: true,

  isShowTaskAsGrid: false,
  gridWidth: 10,

  concurrency: 5,
  isSealing: true,
} as const satisfies Omit<TasksOptions<unknown[]>, 'title'>;

export const DRAW = {
  iconWidth: 2,
  middleWidth: 2,
  startEndWidth: 4,
} as const;
