import dedent from 'dedent';
import { Text } from 'ink';
import { describeComponentRender } from '~/__tests__';
import { LineCol } from './line-col';

describeComponentRender({
  name: 'line-col',
  node: ({ props }) => <LineCol {...props} />,
  cases: [
    {
      name: 'text: string',
      props: { text: 'The quick brown fox jumps over the lazy dog' },
      text: 'The quick brown fox jumps over the lazy dog',
    },
    {
      name: 'text: string, width = 5',
      props: { text: 'abc', width: 5 },
      text: 'abc  ',
    },
    {
      name: 'text: element',
      props: { text: <Text>abc</Text> },
      text: 'abc',
    },
    {
      name: 'text: element, width = 5',
      props: { text: <Text>abc</Text>, width: 5 },
      text: 'abc  ',
    },
    {
      name: 'text: element, spaceBefore = 1',
      props: { text: <Text>abc</Text>, spaceBefore: true },
      text: ' abc',
    },
    {
      name: 'text: element, spaceBefore = 1',
      props: { text: <Text>abc</Text>, spaceBefore: false },
      text: 'abc',
    },
  ],
});

describeComponentRender({
  name: 'line-col-wrapper',
  node: ({ props }) => <LineCol {...props} />,
  boxProps: { width: 10 },
  hasWrapper: false,
  cases: [
    {
      name: 'text: string',
      props: {
        text: 'abcdefghijklmnopqrstuvwxyz',
        width: 'wrap',
      },
      text: dedent`
        abcdefghij
        klmnopqrst
        uvwxyz
      `,
    },
    {
      name: 'text: string',
      props: {
        text: 'abcdefghijklmnopqrstuvwxyz',
        width: 'no-wrap',
      },
      text: 'abcdefghijklmnopqrstuvwxyz',
    },
  ],
});
