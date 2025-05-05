import { expect } from 'vitest';
import { describeComponentRender } from '~/__tests__';
import { TextTimer } from './text-timer';

const expectFn = (frame: string | undefined): void => {
  expect(frame).toMatch(/^\d+\.\d+s$/);
};

describeComponentRender<{
  startTime?: bigint;
  endTime?: bigint;
}>({
  name: 'text-timer',
  itName: '$text, $startTime, $endTime',
  delay: 10,
  hasWrapper: false,
  node: ({ startTime, endTime }) => (
    <TextTimer startTime={startTime} endTime={endTime} />
  ),
  cases: [
    { startTime: 0n, endTime: 0n, text: '0.00s' },
    { startTime: 0n, endTime: 1_000_000_000n, text: '1.00s' },
    { startTime: 0n, expectFn },
    { endTime: 0n, expectFn },
    { expectFn },
  ] as const,
});
