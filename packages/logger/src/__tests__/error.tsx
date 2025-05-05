import dedent from 'dedent';

export function delayFn(ms = 50) {
  return async () => {
    await new Promise(resolve => setTimeout(resolve, ms));
    return 'data';
  };
}

export function throwError() {
  const error = new Error('Task Error Object');
  error.stack = dedent`
    Error: Task Error Object
        at Task.throwTaskError (/culur/packages/logger/src/item/task.test.mock.tsx:1:1)
        at Task.wait (/culur/packages/logger/src/item/task.mock.tsx:1:1)
        at /culur/packages/logger/src/item/tasks.mock.tsx:1:1
        at new Promise (<anonymous>)
        at ...(<mock>)
  `;

  throw error;
}

export async function throwErrorDelay() {
  await new Promise(resolve => setTimeout(resolve, 50));
  throwError();
}

export function throwErrorWithoutStack() {
  const error = new Error('Task Error Object');
  delete error.stack;

  throw error;
}

export function throwString() {
  // eslint-disable-next-line no-throw-literal
  throw 'Task Error String';
}
