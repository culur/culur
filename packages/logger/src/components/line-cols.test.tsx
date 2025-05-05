import { Text } from 'ink';
import { describeComponentRender } from '~/__tests__';
import { LineCols } from './line-cols';

describeComponentRender({
  name: 'line-cols',
  node: ({ props }) => <LineCols {...props} />,
  cases: [
    {
      name: 'text: string',
      props: {
        cols: [
          { text: 'abc' },
          { text: 'def', width: 5 },
          { text: <Text>gh</Text> },
          { text: <Text>ijk</Text>, width: 5 },
          { text: <Text>lmn</Text>, spaceBefore: true },
        ],
      },
      text: 'abc def   gh ijk   lmn',
    },
  ],
});
