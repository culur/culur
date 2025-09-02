import type { BoxProps } from 'ink';
import type { LineProps } from './line';
import { uniqueId } from 'es-toolkit/compat';
import { describeComponentRender } from '~/__tests__';
import { Icon, Prefix } from '~/types';
import { Line } from './line';

const defineCases = (
  groups: {
    level: number;
    lines: (Omit<LineProps, 'level' | 'key' | 'isStatic'> &
      BoxProps & { text: string })[];
  }[],
) =>
  groups.flatMap(group =>
    group.lines.map<{ text: string; props: LineProps & BoxProps }>(line => ({
      props: {
        ...group,
        ...line,
        key: uniqueId(),
        isStatic: true,
        colsLeft: [{ text: 'l1' }, { text: 'l2' }],
        colsRight: [{ text: 'r1' }, { text: 'r2' }],
        flexGrow: 1,
      },
      text: line.text,
    })),
  );

describeComponentRender({
  name: 'line',
  itName: 'level $props.level, $text',
  hasWrapper: false,
  boxProps: { width: 24 },
  node: ({ props: { key, ...props } }) => <Line key={key} {...props} />,
  cases: [
    ...defineCases([
      {
        level: 0,
        lines: [{ prefix: Prefix.BlockStart, text: '[Invalid level]' }],
      },
      {
        level: 1,
        lines: [
          {
            icon: Icon.Success,
            prefix: Prefix.BlockMiddleLine,
            text: '├─ √ l1 l2         r1 r2',
          },
        ],
      },
      {
        level: 1,
        lines: [
          { prefix: Prefix.BlockStart, /**/ text: '┌─── l1 l2         r1 r2' },
          { prefix: Prefix.BlockMiddleLine, text: '├─ l1 l2           r1 r2' },
          { prefix: Prefix.BlockMiddleNone, text: '│  l1 l2           r1 r2' },
          { prefix: Prefix.BlockEnd, /****/ text: '└─── l1 l2         r1 r2' },
        ],
      },
      {
        level: 2,
        lines: [
          { prefix: Prefix.BlockStart, /**/ text: '├─┬─── l1 l2       r1 r2' },
          { prefix: Prefix.BlockMiddleLine, text: '│ ├─ l1 l2         r1 r2' },
          { prefix: Prefix.BlockMiddleNone, text: '│ │  l1 l2         r1 r2' },
          { prefix: Prefix.BlockEnd, /****/ text: '│ └─── l1 l2       r1 r2' },
        ],
      },
      {
        level: 3,
        lines: [
          { prefix: Prefix.BlockStart, /**/ text: '│ ├─┬─── l1 l2     r1 r2' },
          { prefix: Prefix.BlockMiddleLine, text: '│ │ ├─ l1 l2       r1 r2' },
          { prefix: Prefix.BlockMiddleNone, text: '│ │ │  l1 l2       r1 r2' },
          { prefix: Prefix.BlockEnd, /****/ text: '│ │ └─── l1 l2     r1 r2' },
        ],
      },
    ]),
  ],
});
