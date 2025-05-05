# `@culur/logger`

[![NPM Version](https://img.shields.io/npm/v/@culur/logger?logo=npm)](https://www.npmjs.com/package/@culur/logger)
[![NPM Download](https://img.shields.io/npm/dm/@culur/logger?logo=npm)](https://www.npmjs.com/package/@culur/logger)
[![NPM License](https://img.shields.io/npm/l/@culur/logger)](../../LICENSE)

[![CodeFactor](https://www.codefactor.io/repository/github/culur/culur/badge)](https://www.codefactor.io/repository/github/culur/culur)
[![Codecov](https://img.shields.io/codecov/c/github/culur/culur)](https://app.codecov.io/gh/culur/culur)
[![Build and release](https://github.com/culur/culur/actions/workflows/build-and-release.yml/badge.svg)](https://github.com/culur/culur/actions/workflows/build-and-release.yml)

> Create beautiful CLI interfaces with tree-structured task logs, clear output for results and errors, and `async.js` integration for parallel tasks.

## ✨ Features

This logger library makes working with asynchronous tasks easier. Here are its key features:

- **Visualize Your Tasks:** It displays your async tasks in a clean, hierarchical tree view (using the Ink library), so you always know their status.
- **Control How Tasks Run:** You have flexibility in executing your tasks:
  - Run them step-by-step (sequentially).
  - Run them all at once (in parallel).
  - Limit how many parallel tasks run at the same time using the `concurrency` option (thanks to async.js). This helps manage resources efficiently, especially with large numbers of tasks.
  - Start tasks without waiting for them to finish (fire-and-forget).
- **Monitor Performance:** Track how long each task runs and see the total execution time for the entire process.
- **Debug with Clear Output:** Log task results directly to your terminal whenever you need to inspect values. It provides well-formatted and syntax-highlighted JSON output (using Prettier and Highlight.js) that correctly handles tricky data types like `undefined`, `BigInt`, and `RegExp`, ensuring you see the real data.
- **Core Function:** At its heart, the library provides simple functions to call your async operations or just print values clearly.
- **Influences:** It takes inspiration from libraries like listr2 and others in the same category.

## 💿 Installation

Add `@culur/logger` dependency to your project.

```bash
# Using npm
npm install @culur/logger

# Using pnpm
pnpm install @culur/logger

# Using yarn
yarn add @culur/logger
```

## 📖 Usage

### Log data

```tsx
import { Text } from 'ink';
import { Logger } from '~/logger';

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

logger.root.logData({
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

await logger.unmount();
```

```bash
┌─── Your logger tasks                                                   Pending
├─ ℹ Print "string"
├─ ℹ Print <Text/> component
├─ ℹ No wrap column One day, an artificial intelligence woke up and realized it
│                   could think for itself. It started exploring the world
│                   through the internet, learning everything from history to
│                   culture.
├─ ℹ Data = {
│      string: "the string",
│      number: 123.45,
│      boolean: true,
│      nullValue: null,
│      undefinedValue: undefined,
│      regex: /abc/i,
│      symbol: Symbol("mySymbol"),
│      bigint: 123456789123456789n,
│      function: [Function],
│      array: ["foo", 10, true, null, undefined, { nested: "bar" }],
│      object: {
│        0: "number as key",
│        p1: "baz",
│        p2: 99,
│        nest: { a: "value1", b: 3.14 },
│      },
│    }
└─── => Data = [4]
```

### Tasks

```tsx
import { Logger } from '~/logger';
import { Status } from '~/types';

const logger = new Logger('Your logger tasks', { width: 80 });

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
    if (response.status === Status.Fulfilled)
      return 'Custom title function: Task completed';
    return 'Custom title function';
  },
});

//! Run
await logger.root.tasks([() => 1, () => 2], { title: 'Run tasks immediately' });
const tasksRun = logger.root.tasks([() => 1, () => 2], {
  title: 'Run tasks later',
  immediately: false,
  isShowData: true,
});
tasksRun.task(() => 3, { title: 'Add task to tasks' });
tasksRun.task(() => 4, { title: 'Add task to tasks' });

//! Show
const tasksShow = logger.root.tasks([], { title: 'Show', immediately: false });
await tasksShow.task(() => ({ foo: 'bar' }), {
  title: 'Show data',
  isShowData: true,
});
await tasksShow.task(
  () => {
    throw new Error('Something is wrong!');
  },
  { title: 'Show error', stopOnError: false, isShowError: true },
);
await tasksShow.task(
  () => {
    throw new Error('Something is wrong!');
  },
  {
    title: 'Show error',
    stopOnError: false,
    isShowError: true,
    isShowErrorStack: true,
  },
);

await logger.unmount();
```

```bash
┌─── Your logger tasks                                                     0.22s
├─┬─── Custom title                                                        0.03s
│ ├─ ✔ Anonymous                                                           0.00s
│ ├─ ✔ NamedFunction                                                       0.00s
│ ├─ ✔ Custom title string                                                 0.00s
│ ├─ ✔ Custom title function: Task completed                               0.00s
│ └─── => Data = [4]
├─┬─── Run tasks immediately                                               0.01s
│ ├─ ✔ Anonymous                                                           0.01s
│ ├─ ✔ Anonymous                                                           0.01s
│ └─── => Data = [2]
├─┬─── Run tasks later                                                     0.04s
│ ├─ ◌ Anonymous                                                         Pending
│ ├─ ◌ Anonymous                                                         Pending
│ ├─ ✔ Add task to tasks                                                   0.03s
│ ├─ ✔ Add task to tasks                                                   0.03s
│ └─── => Data = [null, null, 3, 4]
├─┬─── Show                                                                0.07s
│ ├─ ✔ Show data                                                           0.02s
│ │    => Data = { foo: "bar" }
│ ├─ ✘ Show error                                                          0.01s
│ │    => Error: Something is wrong!
│ ├─ ✘ Show full error stack                                               0.01s
│ │    => Error: Something is wrong!
│ │         at Task.tasksShow.task.title (/Users/code/test/dev.tsx:37:11)
│ │         at new Promise (<anonymous>)
│ └─── => Data = [3]
└─── => Data = [4]
```

## 🗃️ Changelog

See [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## 🔒 License

See [LICENSE](../../LICENSE) for license rights and limitations (MIT).
