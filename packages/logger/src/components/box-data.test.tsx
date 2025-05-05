import type { BoxProps } from 'ink';
import dedent from 'dedent';
import { describeComponentRender } from '~/__tests__';
import { BoxData } from './box-data';

const js = dedent;

export const boxDataComplexObject = {
  string: 'the string',
  number: 123.45,
  integer: 67,
  booleanTrue: true,
  booleanFalse: false,
  nullValue: null,
  undefinedValue: undefined, // keep undefined
  regex: /abc/i,
  symbol: Symbol('mySymbol'),
  bigint: 9007199254740991n,
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
    property1: 'baz',
    property2: 99,
    property3: false,
    nestedObject: {
      innerFoo: 'value1',
      innerBar: 3.14,
    },
  },
  emptyArray: [],
  emptyObject: {},
};

describeComponentRender<{
  name: string;
  data: unknown;
  text: string;
  boxProps?: BoxProps;
}>({
  name: 'box-data',
  delay: 100,
  node: data => <BoxData data={data.data} />,
  boxProps: { width: 32, minWidth: 32 },
  hasWrapper: false,
  cases: [
    {
      name: 'multiline string',
      data: 'The quick brown fox jumps over the lazy dog',
      text: [
        'Data =',
        '  "The quick brown fox jumps',
        'over the lazy dog"',
      ].join('\n'),
    },
    { name: 'null', data: null, text: js`Data = null` },
    { name: 'undefined', data: undefined, text: js`Data = undefined` },
    { name: 'regex', data: /abc/i, text: js`Data = /abc/i` },
    { name: 'bigint', data: 123456789n, text: js`Data = 123456789n` },

    {
      name: 'array [string,true]',
      data: ['string', true],
      text: js`Data = ["string", true]`,
    },
    {
      name: 'object {complex}',
      boxProps: { width: 80 },
      data: boxDataComplexObject,
      text: js`
        Data = {
          string: "the string",
          number: 123.45,
          integer: 67,
          booleanTrue: true,
          booleanFalse: false,
          nullValue: null,
          undefinedValue: undefined,
          regex: /abc/i,
          symbol: Symbol("mySymbol"),
          bigint: 9007199254740991n,
          function: [Function],
          array: ["foo", 10, true, null, undefined, { nested: "bar" }],
          object: {
            property1: "baz",
            property2: 99,
            property3: false,
            nestedObject: { innerFoo: "value1", innerBar: 3.14 },
          },
          emptyArray: [],
          emptyObject: {},
        }
      `,
    },
  ],
});
