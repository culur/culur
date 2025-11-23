import type { TaskResponse, TasksResponse } from '~/types';
import dedent from 'dedent';
import { range } from 'es-toolkit';
import { expect, expectTypeOf, vi } from 'vitest';
import { describeLogger, isCI, throwError, throwErrorDelay, throwString } from '~/__tests__';
import { expectTaskResponseFulfilled } from './task.test-d';
import { Tasks } from './tasks';

const callbacksNormal = [() => 1, async () => 2];
const callbacksReadonly = [() => 1, async () => 2] as const;

//! Normal
describeLogger('.tasks()', 'Normal', async (root, lastFrame) => {
  //! Return data
  const tasks1Data = await root.tasks(callbacksNormal);
  expectTypeOf(tasks1Data).toEqualTypeOf<number[]>();
  expect(tasks1Data).toEqual([1, 2]);

  //! Return response
  const tasks2Response = await root.tasks(callbacksNormal, { isReturnOrThrow: false, isShowTimer: true });
  expectTypeOf(tasks2Response).toEqualTypeOf<TasksResponse<number[]>>();
  expectTypeOf(tasks2Response).toEqualTypeOf<TaskResponse<number>[]>();
  expect(tasks2Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks2Response[0], 1);
  expectTaskResponseFulfilled(tasks2Response[1], 2);

  //! Return task
  const tasks3 = root.tasks(callbacksNormal, { immediately: false, isShowTimer: true });
  expectTypeOf(tasks3).toEqualTypeOf<Tasks<number[]>>();
  expect(tasks3).instanceOf(Tasks);

  const tasks3Data = await tasks3.wait();
  expectTypeOf(tasks3Data).toEqualTypeOf<number[]>();

  const tasks3Response = await tasks3.wait({ isReturnOrThrow: false });
  expectTypeOf(tasks3Response).toEqualTypeOf<TasksResponse<number[]>>();
  expectTypeOf(tasks3Response).toEqualTypeOf<TaskResponse<number>[]>();
  expect(tasks3Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks3Response[0], 1);
  expectTaskResponseFulfilled(tasks3Response[1], 2);

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Normal
      ├─┬─── Tasks
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 2
      ├─┬─── Tasks                                 0.00s
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 2
      ├─┬─── Tasks                                 0.00s
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 2
      └─── => Count = 0
    `);
  }
});

//! Normal readonly
describeLogger('.tasks()', 'Normal readonly', async (root, lastFrame) => {
  //! Return data
  const tasks1Data = await root.tasks(callbacksReadonly);
  expectTypeOf(tasks1Data).toEqualTypeOf<[number, number]>();
  expect(tasks1Data).toEqual([1, 2]);

  //! Return response
  const tasks2Response = await root.tasks(callbacksReadonly, { isReturnOrThrow: false });
  expectTypeOf(tasks2Response).toEqualTypeOf<[TaskResponse<number>, TaskResponse<number>]>();
  expect(tasks2Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks2Response[0], 1);
  expectTaskResponseFulfilled(tasks2Response[1], 2);

  //! Return task
  const tasks3 = root.tasks(callbacksReadonly, { immediately: false });
  expectTypeOf(tasks3).toEqualTypeOf<Tasks<[number, number]>>();
  expect(tasks3).instanceOf(Tasks);

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
      ├─┬─── Tasks
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 2
      ├─┬─── Tasks
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 2
      ├─┬─── Tasks
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 2
      └─── => Count = 0
    `);
  }
});

describeLogger('.task()', 'Nested', async (root, lastFrame) => {
  const tasks = root.tasks([() => 1, () => 2], { immediately: false, isShowTimer: true });
  tasks.tasks([() => 3.1, () => 3.2], { immediately: false, isShowTimer: true });

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Nested
      ├─┬─── Tasks                               Pending
      │ ├─ ◌ Anonymous                           Pending
      │ ├─ ◌ Anonymous                           Pending
      │ ├─┬─── Tasks                             Pending
      │ │ ├─ ◌ Anonymous                         Pending
      │ │ ├─ ◌ Anonymous                         Pending
      │ │ └─── => Count = 2
      │ └─── => Count = 2
      └─── => Count = 0
    `);
  }
});

//! Not show all tasks
describeLogger('.task()', 'Not show all tasks', async (root, lastFrame) => {
  const tasksGroup = root.group('Tasks', { isShowAllFulfilled: false, isShowAllPending: false });
  const tasks = range(0, 10).map(index => tasksGroup.task(() => index, { immediately: false }));

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Not show all tasks
      ├─┬─── Tasks
      │ ├─ ◌ 10 pending tasks...                 Pending
      │ └─── => Count = 10
      └─── => Count = 0
    `);
  }

  await Promise.all(tasks.slice(0, 3).map(task => task.wait()));

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Not show all tasks
      ├─┬─── Tasks
      │ ├─ ⠋ 3 completed tasks...
      │ ├─ ◌ 7 pending tasks...                  Pending
      │ └─── => Count = 10
      └─── => Count = 0
    `);
  }

  await tasksGroup.wait();

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Not show all tasks
      ├─┬─── Tasks
      │ ├─ √ 10 completed tasks!
      │ └─── => Count = 10
      └─── => Count = 0
    `);
  }
});

describeLogger('.task()', 'Show task as grid', async (root, lastFrame) => {
  const tasksGroup = root.group('Tasks', { isShowTaskAsGrid: true });
  const tasks = range(0, 10).map(index => tasksGroup.task(() => index, { immediately: false }));

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Show task as grid
      ├─┬─── Tasks
      │ ├─ ⠋ ░░░░░░░░░░
      │ └─── => Count = 10
      └─── => Count = 0
    `);
  }

  await Promise.all(tasks.slice(0, 3).map(task => task.wait()));

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Show task as grid
      ├─┬─── Tasks
      │ ├─ ⠋ ███░░░░░░░
      │ └─── => Count = 10
      └─── => Count = 0
    `);
  }

  await tasksGroup.wait();

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Show task as grid
      ├─┬─── Tasks
      │ ├─ √ ██████████
      │ └─── => Count = 10
      └─── => Count = 0
    `);
  }
});

//! Error
describeLogger('.tasks()', 'Error object', async root => {
  await expect(() => root.tasks([throwError])) //
    .rejects.toThrowError(/^Task Error Object$/);
});

describeLogger('.tasks()', 'Error string', async root => {
  await expect(() => root.tasks([throwString])) //
    .rejects.toThrowError(/^Task Error String$/);
});

//! Wait
describeLogger('.tasks().wait()', 'Wait pending, running tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(() => 1 as const);
  const tasksCallback2 = vi.fn(() => 2 as const);
  const tasksCallback3 = vi.fn(() => new Promise(resolve => setTimeout(resolve, 200)));
  const tasksCallback4 = vi.fn(() => new Promise(resolve => setTimeout(resolve, 200)));

  const tasks = root.tasks(
    [tasksCallback1, tasksCallback2] as const, //
    { immediately: false },
  );
  expect(tasks.isRunning).toStrictEqual(true);
  tasks.task(tasksCallback3);
  tasks.task(tasksCallback4);
  expect(tasks.isRunning).toStrictEqual(true);

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Wait pending, running tasks
      ├─┬─── Tasks
      │ ├─ ◌ Mock                                Pending
      │ ├─ ◌ Mock                                Pending
      │ ├─ ⠋ Mock                                  0.00s
      │ ├─ ⠋ Mock                                  0.00s
      │ └─── => Count = 4
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

describeLogger('.tasks().wait()', 'Throw on pending tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(throwErrorDelay);
  const tasks = root.tasks([tasksCallback1], { immediately: false });

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Throw on pending tasks
      ├─┬─── Tasks
      │ ├─ ◌ Mock                                Pending
      │ └─── => Count = 1
      └─── => Count = 0
    `);
  }

  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
});

describeLogger('.tasks().wait()', 'Throw on running tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(throwErrorDelay);
  const tasks = root.tasks([], { immediately: false });

  // eslint-disable-next-line test/valid-expect
  const expectRejects = expect(tasks.task(tasksCallback1)).rejects.toThrowError('Task Error Object');

  await new Promise(resolve => setTimeout(resolve, 100));
  if (!isCI()) {
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Throw on running tasks
      ├─┬─── Tasks
      │ ├─ ⠋ Mock                                  0.00s
      │ └─── => Count = 1
      └─── => Count = 0
    `);
  }

  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
  await expectRejects;
});

//! Seal
describeLogger('.task()', 'Seal', async (root, lastFrame) => {
  const tasks = root.tasks([() => 1, () => 2], { immediately: false });

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Seal
      ├─┬─── Tasks
      │ ├─ ◌ Anonymous                           Pending
      │ ├─ ◌ Anonymous                           Pending
      │ └─── => Count = 2
      └─── => Count = 0
    `);
  }

  expect(() => tasks.end()).toThrowError('Cannot seal tasks!');
  await tasks.wait();
  tasks.end();

  await expect(tasks.logData('Error')).rejects.toThrowError('Tasks is already sealed');
  expect(() => tasks.log('Error')).toThrowError('Tasks is already sealed');
  expect(() => tasks.task(() => 'Error')).toThrowError('Tasks is already sealed');
  expect(() => tasks.tasks([() => 'Error'])).toThrowError('Tasks is already sealed');
});

//! Title
describeLogger('.tasks({ title })', 'Custom title', async (root, lastFrame) => {
  await root.tasks([() => 1], { title: 'The title string' });
  await root.tasks([() => 1], { title: () => 'The title function' });

  const tasks1 = root.tasks([], { immediately: false });
  tasks1.title = 'Cannot set title after created';

  const tasks2 = root.tasks([], { immediately: false, isShowTimer: true });
  tasks2.title = 'Set title after created';

  const tasks3 = root.tasks([], { immediately: false });
  tasks3.title = 'Set title after created';

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Custom title
      ├─┬─── The title string
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 1
      ├─┬─── The title function
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Count = 1
      ├─┬─── Cannot set title after created
      │ └─── => Count = 0
      ├─┬─── Set title after created             Pending
      │ └─── => Count = 0
      ├─┬─── Set title after created
      │ └─── => Count = 0
      └─── => Count = 0
    `);
  }
});

//! Show
describeLogger('.tasks()', 'Show data and error', async (root, lastFrame) => {
  const tasks = root.tasks([() => 1, () => 2], { immediately: false, isShowData: true });
  await tasks.onChange();

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Show data and error
      ├─┬─── Tasks
      │ ├─ ◌ Anonymous                           Pending
      │ ├─ ◌ Anonymous                           Pending
      │ └─── => Data = [null, null]
      └─── => Count = 0
    `);
  }

  await tasks.wait({ isSealing: false });
  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Show data and error
      ├─┬─── Tasks
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ └─── => Data = [1, 2]
      └─── => Count = 0
    `);
  }

  await tasks.task(() => 3, { isShowData: true });
  await tasks.wait();

  if (!isCI()) {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(lastFrame()).toStrictEqual(dedent`
      ┌─── Show data and error
      ├─┬─── Tasks
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ ├─ √ Anonymous                             0.00s
      │ │    => Data = 3
      │ └─── => Data = [1, 2, 3]
      └─── => Count = 0
    `);
  }
});
