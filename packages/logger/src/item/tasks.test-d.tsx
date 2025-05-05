import type { TaskResponse } from '~/types';
import dedent from 'dedent';
import { expect, expectTypeOf, vi } from 'vitest';
import { describeLogger, throwError, throwErrorDelay, throwString } from '~/__tests__';
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
  const tasks2Response = await root.tasks(callbacksNormal, { stopOnError: false });
  expectTypeOf(tasks2Response).toEqualTypeOf<TaskResponse<number>[]>();
  expect(tasks2Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks2Response[0], 1);
  expectTaskResponseFulfilled(tasks2Response[1], 2);

  //! Return task
  const tasks3 = root.tasks(callbacksNormal, { immediately: false });
  expectTypeOf(tasks3).toEqualTypeOf<Tasks<number[]>>();
  expect(tasks3).instanceOf(Tasks);

  const tasks3Data = await tasks3.wait();
  expectTypeOf(tasks3Data).toEqualTypeOf<number[]>();

  const tasks3Response = await tasks3.wait({ stopOnError: false });
  expectTypeOf(tasks3Response).toEqualTypeOf<TaskResponse<number>[]>();
  expect(tasks3Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks3Response[0], 1);
  expectTaskResponseFulfilled(tasks3Response[1], 2);

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Normal                                  0.00s
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [2]
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [2]
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [2]
    └─── => Data = [3]
  `);
});

//! Normal readonly
describeLogger('.tasks()', 'Normal readonly', async (root, lastFrame) => {
  //! Return data
  const tasks1Data = await root.tasks(callbacksReadonly);
  expectTypeOf(tasks1Data).toEqualTypeOf<readonly [number, number]>();
  expect(tasks1Data).toEqual([1, 2]);

  //! Return response
  const tasks2Response = await root.tasks(callbacksReadonly, { stopOnError: false });
  expectTypeOf(tasks2Response).toEqualTypeOf<readonly [TaskResponse<number>, TaskResponse<number>]>();
  expect(tasks2Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks2Response[0], 1);
  expectTaskResponseFulfilled(tasks2Response[1], 2);

  //! Return task
  const tasks3 = root.tasks(callbacksReadonly, { immediately: false });
  expectTypeOf(tasks3).toEqualTypeOf<Tasks<readonly [number, number]>>();
  expect(tasks3).instanceOf(Tasks);

  const tasks3Data = await tasks3.wait();
  expectTypeOf(tasks3Data).toEqualTypeOf<readonly [number, number]>();

  const tasks3Response = await tasks3.wait({ stopOnError: false });
  expectTypeOf(tasks3Response).toEqualTypeOf<readonly [TaskResponse<number>, TaskResponse<number>]>();
  expect(tasks3Response).toHaveLength(2);
  expectTaskResponseFulfilled(tasks3Response[0], 1);
  expectTaskResponseFulfilled(tasks3Response[1], 2);

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Normal readonly                         0.00s
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [2]
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [2]
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [2]
    └─── => Data = [3]
  `);
});

describeLogger('.task()', 'Nested', async (root, lastFrame) => {
  const tasks = root.tasks([() => 1, () => 2], { immediately: false });
  tasks.tasks([() => 3.1, () => 3.2], { immediately: false });

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Nested                                Pending
    ├─┬─── Tasks                               Pending
    │ ├─ ◌ Anonymous                           Pending
    │ ├─ ◌ Anonymous                           Pending
    │ ├─┬─── Tasks                             Pending
    │ │ ├─ ◌ Anonymous                         Pending
    │ │ ├─ ◌ Anonymous                         Pending
    │ │ └─── => Data = [2]
    │ └─── => Data = [3]
    └─── => Data = [1]
  `);
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
  const tasksCallback1 = vi.fn();
  const tasksCallback2 = vi.fn();
  const tasksCallback3 = vi.fn(() => new Promise(resolve => setTimeout(resolve, 50)));
  const tasksCallback4 = vi.fn(() => new Promise(resolve => setTimeout(resolve, 50)));
  const tasks = root.tasks([tasksCallback1, tasksCallback2], { immediately: false });
  expect(tasks.isRunning).toStrictEqual(true);
  tasks.task(tasksCallback3);
  tasks.task(tasksCallback4);
  expect(tasks.isRunning).toStrictEqual(true);

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Wait pending, running tasks             0.00s
    ├─┬─── Tasks                                 0.00s
    │ ├─ ◌ spy                                 Pending
    │ ├─ ◌ spy                                 Pending
    │ ├─ ⠋ spy                                   0.00s
    │ ├─ ⠋ spy                                   0.00s
    │ └─── => Data = [4]
    └─── => Data = [1]
  `);

  await tasks.wait({ stopOnError: true, concurrency: 1 });
  expect(tasksCallback1).toBeCalledTimes(1);
  expect(tasksCallback2).toBeCalledTimes(1);
  expect(tasks.isRunning).toStrictEqual(false);

  // call wait again, fulfilled tasks will not be called 2 times
  await tasks.wait({ stopOnError: true, concurrency: 2 });
  await tasks.wait({ stopOnError: false, concurrency: 1 });
  await tasks.wait({ stopOnError: false, concurrency: 2 });

  expect(tasksCallback1).toBeCalledTimes(1);
  expect(tasksCallback2).toBeCalledTimes(1);
});

describeLogger('.tasks().wait()', 'Throw on pending tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(throwErrorDelay);
  const tasks = root.tasks([tasksCallback1], { immediately: false });

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Throw on pending tasks                Pending
    ├─┬─── Tasks                               Pending
    │ ├─ ◌ throwErrorDelay                     Pending
    │ └─── => Data = [1]
    └─── => Data = [1]
  `);

  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
});

describeLogger('.tasks().wait()', 'Throw on running tasks', async (root, lastFrame) => {
  const tasksCallback1 = vi.fn(throwErrorDelay);
  const tasks = root.tasks([], { immediately: false });
  // eslint-disable-next-line test/valid-expect
  const expectRejects = expect(tasks.task(tasksCallback1)).rejects.toThrowError('Task Error Object');

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Throw on running tasks                  0.00s
    ├─┬─── Tasks                                 0.00s
    │ ├─ ⠋ throwErrorDelay                       0.00s
    │ └─── => Data = [1]
    └─── => Data = [1]
  `);

  await expect(tasks.wait()).rejects.toThrowError('Task Error Object');
  await expectRejects;
});

//! Title
describeLogger('.tasks({ title })', 'Custom title', async (root, lastFrame) => {
  await root.tasks([() => 1], { title: 'The title string' });
  await root.tasks([() => 1], { title: () => 'The title function' });
  const tasks = root.tasks([], { immediately: false });
  tasks.title = 'Set title after created';

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Custom title                            0.00s
    ├─┬─── The title string                      0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [1]
    ├─┬─── The title function                    0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [1]
    ├─┬─── Set title after created             Pending
    │ └─── => Data = [0]
    └─── => Data = [3]
  `);
});

//! Show
describeLogger('.tasks()', 'Show data and error', async (root, lastFrame) => {
  const tasks = root.tasks([() => 1, () => 2], { immediately: false, isShowData: true });
  await new Promise(resolve => setTimeout(resolve, 50));

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Show data and error                   Pending
    ├─┬─── Tasks                               Pending
    │ ├─ ◌ Anonymous                           Pending
    │ ├─ ◌ Anonymous                           Pending
    │ └─── => Data = [null, null]
    └─── => Data = [1]
  `);

  await tasks.wait();
  await new Promise(resolve => setTimeout(resolve, 50));

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Show data and error                     0.00s
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ └─── => Data = [1, 2]
    └─── => Data = [1]
  `);

  await tasks.task(() => 3, { isShowData: true });
  await new Promise(resolve => setTimeout(resolve, 50));

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Show data and error                     0.00s
    ├─┬─── Tasks                                 0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ ├─ ✔ Anonymous                             0.00s
    │ │    => Data = 3
    │ └─── => Data = [1, 2, 3]
    └─── => Data = [1]
  `);
});
