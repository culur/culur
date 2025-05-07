import type { IRootObject } from '~/item';
import dedent from 'dedent';
import { describeComponentRender } from '~/__tests__';
import { formatData } from '~/utils';
import { BoxSyntaxJS } from './box-syntax-js';

const js = dedent;

export const boxSyntaxComplexObject = {
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

const defaultWidth = 32;

describeComponentRender<{
  name: string;
  data: unknown;
  text: string;
  boxProps?: IRootObject['props'];
  formatDataWidth?: number | null;
}>({
  name: 'box-syntax-js',
  async node({ data, boxProps, ...props }) {
    const width =
      'formatDataWidth' in props
        ? props.formatDataWidth
        : (boxProps?.width ?? defaultWidth);
    const code = await formatData({ data, level: 1, width });
    return <BoxSyntaxJS code={code} />;
  },
  boxProps: { width: defaultWidth, minWidth: defaultWidth },
  hasWrapper: false,
  cases: [
    {
      name: 'long string',
      data: 'The quick brown fox jumps over the lazy dog',
      text: [
        'Data =',
        '  "The quick brown fox jumps',
        'over the lazy dog"',
      ].join('\n'),
    },
    {
      name: 'multiline string',
      data: 'The quick brown fox\njumps over the lazy dog',
      text: [
        'Data = `The quick brown fox', //
        'jumps over the lazy dog`',
      ].join('\n'),
    },
    { name: 'null', data: null, text: js`Data = null` },
    { name: 'undefined', data: undefined, text: js`Data = undefined` },
    { name: 'regex', data: /abc/i, text: js`Data = /abc/i` },
    { name: 'bigint', data: 123456789n, text: js`Data = 123456789n` },

    {
      name: 'string',
      data: 'The lazy',
      text: js`Data = "The lazy"`,
      formatDataWidth: null,
    },
    {
      name: 'string',
      data: 'The lazy',
      text: [
        'Data =', //
        '  "The lazy"',
      ].join('\n'),
      formatDataWidth: undefined,
    },
    {
      name: 'string (double quotes)',
      data: '"double"',
      text: js`Data = '"double"'`,
    },
    {
      name: 'string (single quotes)',
      data: "'single'",
      text: js`Data = "'single'"`,
    },
    {
      name: 'string (single and double quotes)',
      data: `'single' "double"`,
      text: js`Data = \`'single' "double"\``,
    },
    {
      name: 'string (escape double quotes)',
      data: `'single' "double" \`backtick\``,
      text: js`Data = \`'single' "double" ${'\\`'}backtick${'\\`'}\``,
      boxProps: { width: 60 },
    },
    {
      name: 'array [string,true]',
      data: ['string', true],
      text: js`Data = ["string", true]`,
    },
    {
      name: 'object {complex}',
      boxProps: { width: 80 },
      data: boxSyntaxComplexObject,
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
