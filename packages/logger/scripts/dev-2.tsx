import { Logger } from '~/logger/logger';
import { Status } from '~/types';

const logger = new Logger('Your logger tasks', { width: 80 });

//! Title
const tasksTitle = logger.root.tasks([], {
  title: 'Custom title',
  immediately: false,
});

await tasksTitle.task(() => {});
await tasksTitle.task(function NamedFunction() {});

tasksTitle.task(() => {}, { title: 'Custom title string', immediately: false });
tasksTitle.task(() => {}, {
  title(response) {
    if (response.status === Status.Fulfilled) return 'Custom title function: Task completed';
    return 'Custom title function';
  },
  immediately: false,
});

await logger.root.wait({ isReturnOrThrow: true, isSealing: true });

await logger.unmount();
