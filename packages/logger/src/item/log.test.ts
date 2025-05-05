import dedent from 'dedent';
import { expect } from 'vitest';
import { describeLogger } from '~/__tests__';
import { boxDataComplexObject } from '~/components/box-data.test';

describeLogger('logger', 'Logger', async (root, lastFrame) => {
  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Logger                                Pending
    └─── => Data = [0]
  `);

  root.log('Log 1');
  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Logger                                Pending
    ├─ ℹ Log 1
    └─── => Data = [1]
  `);

  root.logData(boxDataComplexObject);
  await new Promise(resolve => setTimeout(resolve, 50));

  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Logger                                Pending
    ├─ ℹ Log 1
    ├─ ℹ Data = {
    │      string: "the string",
    │      number: 123.45,
    │      integer: 67,
    │      booleanTrue: true,
    │      booleanFalse: false,
    │      nullValue: null,
    │      undefinedValue: undefined,
    │      regex: /abc/i,
    │      symbol: Symbol("mySymbol"),
    │      bigint: 9007199254740991n,
    │      function: [Function],
    │      array: [
    │        "foo",
    │        10,
    │        true,
    │        null,
    │        undefined,
    │        { nested: "bar" },
    │      ],
    │      object: {
    │        property1: "baz",
    │        property2: 99,
    │        property3: false,
    │        nestedObject: {
    │          innerFoo: "value1",
    │          innerBar: 3.14,
    │        },
    │      },
    │      emptyArray: [],
    │      emptyObject: {},
    │    }
    └─── => Data = [2]
  `);
});
