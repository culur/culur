import type { TextProps } from 'ink';

export const TASK = {
  isShowData: false,
  isShowErrorStack: false,
  isShowError: false,
} as const;

export const TASKS = {
  isShowData: false,
  tasksConcurrency: 5,
};

export const DRAW = {
  iconWidth: 2,
  middleWidth: 2,
  startEndWidth: 4,
  color: 'cyan' satisfies TextProps['color'],
} as const;
