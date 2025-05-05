import dedent from 'dedent';
import { expect } from 'vitest';
import { describeLogger } from '~/__tests__';
import { boxSyntaxComplexObject } from '~/components/box-syntax-js.test';

describeLogger('logger', 'Logger', async (root, lastFrame) => {
  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Logger
    └─── => Count = 0
  `);

  root.log('Log 1');
  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Logger
    ├─ ℹ Log 1
    └─── => Count = 0
  `);

  await root.logData(boxSyntaxComplexObject);
  expect(lastFrame()).toStrictEqual(dedent`
    ┌─── Logger
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
    └─── => Count = 0
  `);
});
