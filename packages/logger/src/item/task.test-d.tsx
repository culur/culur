import type { DeeplyAllowMatchers } from 'vitest';
import type { TaskResponse } from '~/types';
import dedent from 'dedent';
import { assert, expect, expectTypeOf, vi } from 'vitest';
import { describeLogger, isCI, throwError, throwErrorWithoutStack, throwString } from '~/__tests__';
import { Status } from '~/types';
import { Task } from './task';

export function expectTaskResponseFulfilled<T>(taskResponse: TaskResponse<T>, data: DeeplyAllowMatchers<T>) {
  assert(taskResponse.status === Status.Fulfilled);
  expect(taskResponse.data).toStrictEqual(data);
  expect(taskResponse.startTime).toBeTypeOf('bigint');
  expect(taskResponse.endTime).toBeTypeOf('bigint');
}

//! Normal
describeLogger('.task()', 'Normal', async (root, lastFrame) => {
  //! Return data
  const task1Data = await root.task(() => 1, { title: 'Return data' });
  expectTypeOf(task1Data).toEqualTypeOf<number>();
  expect(task1Data).toStrictEqual(1);

  //! Return response
  const task2Response = await root.task(() => 2, { isReturnOrThrow: false, title: 'Return response' });
  expectTypeOf(task2Response).toEqualTypeOf<TaskResponse<number>>();
  expectTaskResponseFulfilled(task2Response, 2);

  //! Return task
  const task3Callback = vi.fn(() => 3);
  const task3 = root.task(task3Callback, { immediately: false, title: 'Return task' });
  expectTypeOf(task3).toEqualTypeOf<Task<number>>();
  expect(task3).instanceOf(Task);
  expect(task3.error).toBeNull();

  const task3Data = await task3.wait();
  expectTypeOf(task3Data).toEqualTypeOf<number>();
  expect(task3Callback).toBeCalledTimes(1);

  const task3Response = await task3.wait({ isReturnOrThrow: false });
  expectTypeOf(task3Response).toEqualTypeOf<TaskResponse<number>>();
  expect(task3Callback).toBeCalledTimes(1); // Load previous data, don't call again
  expectTaskResponseFulfilled(task3Response, 3);

  const task3DataAgain = await task3.wait();
  expectTypeOf(task3DataAgain).toEqualTypeOf<number>();
  expect(task3Callback).toBeCalledTimes(1); // Load previous data, don't call again

  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Normal
      ├─ √ Return data                             0.00s
      ├─ √ Return response                         0.00s
      ├─ √ Return task                             0.00s
      └─── => Count = 3
    `);
  }
});

//! Error
describeLogger('.task()', 'Error object', async root => {
  await expect(() => root.task(throwError)) //
    .rejects.toThrowError(/^Task Error Object$/);
});

describeLogger('.task()', 'Error string', async root => {
  await expect(() => root.task(throwString)) //
    .rejects.toThrowError(/^Task Error String$/);
});

//! Wait
describeLogger('.task().wait()', 'Normal', async (root, lastFrame) => {
  const task = root.task(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return null;
    },
    { immediately: false },
  );
  expect(task.response.status).toStrictEqual(Status.Pending);
  expect(task.isRunning).toStrictEqual(true);
  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Normal
      ├─ ◌ Anonymous                             Pending
      └─── => Count = 1
    `);
  }

  task.wait();
  expect(task.response.status).toStrictEqual(Status.Running);
  expect(task.isRunning).toStrictEqual(true);
  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Normal
      ├─ ⠋ Anonymous                               0.00s
      └─── => Count = 1
    `);
  }

  await task.wait();
  expect(task.response.status).toStrictEqual(Status.Fulfilled);
  expect(task.isRunning).toStrictEqual(false);
  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Normal
      ├─ √ Anonymous                               0.00s
      └─── => Count = 1
    `);
  }
});

//! Title
describeLogger('.task({ title })', 'Custom title', async (root, lastFrame) => {
  await root.task(() => {}, { title: 'The title string' });
  await root.task(() => {}, { title: () => 'The title function' });
  await root.task(function () {
    this.title = `Set title string [${this.data}]`;
    return 'Title string';
  });
  await root.task(function () {
    this.title = () => `Set title function [${this.data}]`;
    return 'Title function';
  });

  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Custom title
      ├─ √ The title string                        0.00s
      ├─ √ The title function                      0.00s
      ├─ √ Set title string [null]                 0.00s
      ├─ √ Set title function [Title function]     0.00s
      └─── => Count = 4
    `);
  }
});

//! Show
describeLogger('.task()', 'Show data and error', async (root, lastFrame) => {
  await root.task(() => 1, { isShowData: true });
  await root.task(throwString, { isReturnOrThrow: false, isShowError: true });
  await root.task(throwError, { isReturnOrThrow: false });
  await root.task(throwError, { isReturnOrThrow: false, isShowError: true });
  await root.task(throwError, { isReturnOrThrow: false, isShowError: true, isShowErrorStack: true });
  await root.task(throwErrorWithoutStack, { isReturnOrThrow: false, isShowError: true, isShowErrorStack: true });

  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Show data and error
      ├─ √ Anonymous                               0.00s
      │    => Data = 1
      ├─ × throwString                             0.00s
      │    => Error: Task Error String
      ├─ × throwError                              0.00s
      ├─ × throwError                              0.00s
      │    => Error: Task Error Object
      ├─ × throwError                              0.00s
      │    => Error: Task Error Object
      │         at Task.throwTaskError (/culur/packages/
      │       logger/src/item/task.test.mock.tsx:1:1)
      │         at Task.wait (/culur/packages/logger/src
      │       /item/task.mock.tsx:1:1)
      │         at /culur/packages/logger/src/item/tasks
      │       .mock.tsx:1:1
      │         at new Promise (<anonymous>)
      │         at ...(<mock>)
      ├─ × throwErrorWithoutStack                  0.00s
      │    => Error: Task Error Object
      └─── => Count = 6
    `);
  }
});
