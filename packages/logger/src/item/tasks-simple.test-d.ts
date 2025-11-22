import type { TaskResponse, TasksSimpleResponse } from '~/types';
import dedent from 'dedent';
import { expect, expectTypeOf, vi } from 'vitest';
import { describeLogger, isCI, throwError, throwErrorDelay, throwString } from '~/__tests__';
import { expectTaskResponseFulfilled } from './task.test-d';
import { TasksSimple } from './tasks-simple';

const callbacksNormal = [() => 1, async () => 2];
const callbacksReadonly = [() => 1, async () => 2] as const;

//! Normal
describeLogger('.tasksSimple()', 'Normal', async (root, lastFrame) => {
  //! Return data
  const tasks1Data = await root.tasksSimple(callbacksNormal);
  expectTypeOf(tasks1Data).toEqualTypeOf<number[]>();
  expect(tasks1Data).toEqual([1, 2]);

  //! Return response
  const tasks2Response = await root.tasksSimple(callbacksNormal, { isReturnOrThrow: false, isShowTimer: true });
  expectTypeOf(tasks2Response).toEqualTypeOf<TasksSimpleResponse<number[]>>();
  expectTypeOf(tasks2Response).toEqualTypeOf<TaskResponse<number>[]>();
  expect(tasks2Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks2Response[0], 1);
  expectTaskResponseFulfilled(tasks2Response[1], 2);

  //! Return task
  const tasks3 = root.tasksSimple(callbacksNormal, { immediately: false, isShowTimer: true });
  expectTypeOf(tasks3).toEqualTypeOf<TasksSimple<number[]>>();
  expect(tasks3).instanceOf(TasksSimple);
  expect(tasks3.error).toBeNull();

  const tasks3Data = await tasks3.wait();
  expectTypeOf(tasks3Data).toEqualTypeOf<number[]>();

  const tasks3Response = await tasks3.wait({ isReturnOrThrow: false });
  expectTypeOf(tasks3Response).toEqualTypeOf<TasksSimpleResponse<number[]>>();
  expectTypeOf(tasks3Response).toEqualTypeOf<TaskResponse<number>[]>();
  expect(tasks3Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks3Response[0], 1);
  expectTaskResponseFulfilled(tasks3Response[1], 2);

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Normal
      ├─ √ Tasks
      │    ██
      ├─ √ Tasks                                   0.00s
      │    ██
      ├─ √ Tasks                                   0.00s
      │    ██
      └─── => Count = 0
    `);
  }
});

//! Normal readonly
describeLogger('.tasksSimple()', 'Normal readonly', async (root, lastFrame) => {
  //! Return data
  const tasks1Data = await root.tasksSimple(callbacksReadonly);
  expectTypeOf(tasks1Data).toEqualTypeOf<[number, number]>();
  expect(tasks1Data).toEqual([1, 2]);

  //! Return response
  const tasks2Response = await root.tasksSimple(callbacksReadonly, { isReturnOrThrow: false });
  expectTypeOf(tasks2Response).toEqualTypeOf<[TaskResponse<number>, TaskResponse<number>]>();
  expect(tasks2Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks2Response[0], 1);
  expectTaskResponseFulfilled(tasks2Response[1], 2);

  //! Return task
  const tasks3 = root.tasksSimple(callbacksReadonly, { immediately: false });
  expectTypeOf(tasks3).toEqualTypeOf<TasksSimple<[number, number]>>();
  expect(tasks3).instanceOf(TasksSimple);

  const tasks3Data = await tasks3.wait();
  expectTypeOf(tasks3Data).toEqualTypeOf<[number, number]>();

  const tasks3Response = await tasks3.wait({ isReturnOrThrow: false });
  expectTypeOf(tasks3Response).toEqualTypeOf<[TaskResponse<number>, TaskResponse<number>]>();
  expect(tasks3Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks3Response[0], 1);
  expectTaskResponseFulfilled(tasks3Response[1], 2);

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Normal readonly
      ├─ √ Tasks
      │    ██
      ├─ √ Tasks
      │    ██
      ├─ √ Tasks
      │    ██
      └─── => Count = 0
    `);
  }
});

//! Error
describeLogger('.tasksSimple()', 'Error object', async root => {
  await expect(() => root.tasksSimple([throwError])) //
    .rejects.toThrowError(/^Task Error Object$/);
});

describeLogger('.tasksSimple()', 'Error string', async root => {
  await expect(() => root.tasksSimple([throwString])) //
    .rejects.toThrowError(/^Task Error String$/);
});

describeLogger('.tasksSimple()', 'Error get error', async root => {
  const task = root.tasksSimple([...callbacksNormal, throwError, ...callbacksNormal], { immediately: false });
  expect(task.error).toBeNull();
  await task.wait({ isReturnOrThrow: false });
  expect(task.error).instanceOf(Error);
});

//! Wait
describeLogger('.tasksSimple().wait()', 'Wait pending, running tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(() => 1 as const);
  const tasksCallback2 = vi.fn(() => 2 as const);
  const tasksCallback3 = vi.fn(() => new Promise(resolve => setTimeout(resolve, 200)));
  const tasksCallback4 = vi.fn(() => new Promise(resolve => setTimeout(resolve, 200)));

  const tasks = root.tasksSimple(
    [tasksCallback1, tasksCallback2] as const, //
    { immediately: false },
  );
  expect(tasks.isRunning).toStrictEqual(true);
  tasks.task(tasksCallback3);
  tasks.task(tasksCallback4);
  expect(tasks.isRunning).toStrictEqual(true);

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Wait pending, running tasks
      ├─ ⠋ Tasks
      │    ░░░░
      └─── => Count = 0
    `);
  }

  await tasks.wait({ isReturnOrThrow: true, concurrency: 1 });
  expect(tasksCallback1).toBeCalledTimes(1);
  expect(tasksCallback2).toBeCalledTimes(1);
  expect(tasks.isRunning).toStrictEqual(false);

  // call wait again, fulfilled tasks will not be called 2 times
  await tasks.wait({ isReturnOrThrow: true, concurrency: 2 });
  await tasks.wait({ isReturnOrThrow: false, concurrency: 1 });
  await tasks.wait({ isReturnOrThrow: false, concurrency: 2 });

  expect(tasksCallback1).toBeCalledTimes(1);
  expect(tasksCallback2).toBeCalledTimes(1);
});

describeLogger('.tasksSimple().wait()', 'Throw on pending tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(throwErrorDelay);
  const tasks = root.tasksSimple([tasksCallback1], { immediately: false });

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Throw on pending tasks
      ├─ ◌ Tasks
      │    ░
      └─── => Count = 0
    `);
  }

  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
});

describeLogger('.tasksSimple().wait()', 'Throw on running tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(throwErrorDelay);
  const tasks = root.tasksSimple([], { immediately: false });

  // eslint-disable-next-line test/valid-expect
  const expectRejects = expect(tasks.task(tasksCallback1)).rejects.toThrowError('Task Error Object');

  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Throw on running tasks
      ├─ ⠋ Tasks
      │    ░
      └─── => Count = 0
    `);
  }

  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
  await expectRejects;
});

//! Seal
describeLogger('.task()', 'Seal', async (root, lastFrame) => {
  const tasks = root.tasksSimple([() => 1, () => 2], { immediately: false });

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Seal
      ├─ ◌ Tasks
      │    ░░
      └─── => Count = 0
    `);
  }

  expect(() => tasks.end()).toThrowError('Cannot seal tasks!');
  await tasks.wait({ isSealing: false });
  tasks.end();

  // await expect(tasks.logData('Error')).rejects.toThrowError('Tasks is already sealed');
  // expect(() => tasks.log('Error')).toThrowError('Tasks is already sealed');
  expect(() => tasks.task(() => 'Error')).toThrowError('Tasks is already sealed');
  // expect(() => tasks.tasks([() => 'Error'])).toThrowError('Tasks is already sealed');
  // expect(() => tasks.tasksSimple([() => 'Error'])).toThrowError('Tasks is already sealed');
});

//! Title
describeLogger('.tasksSimple({ title })', 'Custom title', async (root, lastFrame) => {
  await root.tasksSimple([() => 1], { title: 'The title string' });
  await root.tasksSimple([() => 1], { title: () => 'The title function' });

  const tasks1 = root.tasksSimple([], { immediately: false });
  tasks1.title = 'Cannot set title after created';

  const tasks2 = root.tasksSimple([], { immediately: false, isShowTimer: true });
  tasks2.title = 'Set title after created';

  const tasks3 = root.tasksSimple([], { immediately: false });
  tasks3.title = 'Set title after created';

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Custom title
      ├─ √ The title string
      │    █
      ├─ √ The title function
      │    █
      ├─ ◌ Cannot set title after created
      ├─ ◌ Set title after created               Pending
      ├─ ◌ Set title after created
      └─── => Count = 0
    `);
  }
});
