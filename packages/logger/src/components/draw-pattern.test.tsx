import type { DrawPatternProps } from './draw-pattern';
import { describeComponentRender } from '~/__tests__';
import { DrawPattern } from './draw-pattern';

describeComponentRender({
  name: 'draw-pattern',
  itName: '$pattern => $text',
  node: data => (
    <DrawPattern
      middleWidth={2}
      startEndWidth={4}
      color="white"
      pattern={data.pattern}
    />
  ),
  cases: [
    { pattern: '┌─', text: '┌───' },
    { pattern: '├─', text: '├─' },
    { pattern: '│ ', text: '│ ' },
    { pattern: '└─', text: '└───' },
    { pattern: 'unknown' as DrawPatternProps['pattern'], text: '' },
  ] as const satisfies {
    pattern: DrawPatternProps['pattern'];
    text: string;
  }[],
});
