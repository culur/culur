import type { Base } from './base';
import { Log } from './log';
import { Task } from './task';
import { Tasks } from './tasks';

export interface TaskGroup {
  key: string;
  name: ReturnType<typeof getGroupName>;
  tasks: Base[];
}

export function getGroupName({ task, isShowTaskAsGrid }: { task: Base; isShowTaskAsGrid: boolean }) {
  if (task instanceof Log) {
    return 'log' as const;
  }
  if (task instanceof Task) {
    return isShowTaskAsGrid
      ? ('task' as const) // show as grid
      : (`task-${task.status}` as const);
  }
  /* v8 ignore else -- @preserve */
  if (task instanceof Tasks) {
    return 'tasks' as const;
  }
  /* v8 ignore next -- @preserve */
  return 'unknown' as const;
}
