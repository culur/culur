import { Text } from 'ink';
import { random, range } from 'lodash-es';
import { Logger } from '~/logger';
import { Status } from '~/types';

const logger = new Logger('Your logger tasks', { width: 80 });

logger.root.log('Print "string"');
logger.root.log(<Text>Print &lt;Text/&gt; component</Text>);
logger.root.log([
  {
    text: 'No wrap column',
    color: 'blue',
    width: 'no-wrap',
  },
  'One day, an artificial intelligence woke up and realized it could think for itself. It started exploring the world through the internet, learning everything from history to culture.',
]);

await logger.root.logData({
  string: 'the string',
  number: 123.45,
  boolean: true,
  nullValue: null,
  undefinedValue: undefined, // keep undefined
  regex: /abc/i, // support regex
  symbol: Symbol('mySymbol'),
  bigint: 123456789123456789n, // support bigint
  function: () => 'hello', // convert function to [Function]
  array: [
    'foo',
    10,
    true,
    null,
    undefined, // keep undefined
    { nested: 'bar' },
  ],
  object: {
    0: 'number as key',
    p1: 'baz',
    p2: 99,
    nest: {
      a: 'value1',
      b: 3.14,
    },
  },
});

//! Title
const tasksTitle = logger.root.tasks([], {
  title: 'Custom title',
  immediately: false,
});

await tasksTitle.task(() => {});
await tasksTitle.task(function NamedFunction() {});

await tasksTitle.task(() => {}, { title: 'Custom title string' });
await tasksTitle.task(() => {}, {
  title(response) {
    if (response.status === Status.Fulfilled) return 'Custom title function: Task completed';
    return 'Custom title function';
  },
});
await tasksTitle.wait({ isReturnOrThrow: true });

//! Run
await logger.root.tasks([() => 1, () => 2], { title: 'Run tasks immediately' });
const tasksRun = logger.root.tasks([() => 1, () => 2], {
  title: 'Run tasks later',
  immediately: false,
  isShowData: true,
});
tasksRun.task(() => 3, { title: 'Add task to tasks' });
tasksRun.task(() => 4, { title: 'Add task to tasks' });

await tasksRun.wait({ isReturnOrThrow: false });

//! Show
const tasksShow = logger.root.tasks([], { title: 'Show', immediately: false, isShowTimer: false });
await tasksShow.task(() => ({ foo: 'bar' }), {
  title: 'Show data',
  isShowData: true,
});
await tasksShow.task(
  () => {
    throw new Error('Something is wrong!');
  },
  { title: 'Show error', isReturnOrThrow: false, isShowError: true },
);
await tasksShow.task(
  () => {
    throw new Error('Something is wrong!');
  },
  {
    title: 'Show error',
    isReturnOrThrow: false,
    isShowError: true,
    isShowErrorStack: true,
  },
);

await tasksShow.wait({ isReturnOrThrow: false });

await logger.root.tasks(
  range(0, 150).map(
    index =>
      async function () {
        this.title = `Task ${index}`;
        await new Promise(resolve => setTimeout(resolve, random(100, 800)));
        return null;
      },
  ),
  {
    title: 'Run many tasks',
    concurrency: 15,
    isShowTimer: false,
    isShowTaskAsGrid: true,
    gridWidth: 30,
  },
);

await logger.root.wait();

await logger.unmount();
