import { Text } from 'ink';
import { describe, expect, it } from 'vitest';
import { toLineCols } from './line-cols.types';

describe('line-cols.types', () => {
  it.each([
    {
      name: 'string',
      props: 'abc',
      cols: [{ text: 'abc' }],
    },
    {
      name: 'object',
      props: { text: 'abc' },
      cols: [{ text: 'abc' }],
    },
    {
      name: 'ReactElement',
      props: <Text>abc</Text>,
      cols: [{ text: <Text>abc</Text> }],
    },
    {
      name: 'array',
      props: ['first', { text: 'abc' }, <Text key={0}>abc</Text>],
      cols: [
        { text: 'first' },
        { text: 'abc' },
        { text: <Text key={0}>abc</Text> },
      ],
    },
  ])('$name', ({ props, cols: colsExpected }) => {
    const cols = toLineCols(props);
    expect(cols).toEqual(colsExpected);
  });
});
