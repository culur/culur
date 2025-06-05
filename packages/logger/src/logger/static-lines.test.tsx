import type { RefObject } from 'react';
import type { StaticLinesRef } from './static-lines';
import dedent from 'dedent';
import { render } from 'ink-testing-library';
import { assert, describe, expect, it } from 'vitest';
import { Prefix } from '~/types';
import { StaticLines } from './static-lines';

const cols = {
  isStatic: true,
  colsLeft: [{ text: 'l1' }, { text: 'l2' }],
  colsRight: [{ text: 'r1' }, { text: 'r2' }],
};

describe('static lines', () => {
  it('render static lines', async () => {
    const ref: RefObject<StaticLinesRef | null> = { current: null };

    const { lastFrame, unmount } = render(<StaticLines ref={ref} width={24} />);

    assert(ref.current, "ref.current shouldn't be null");

    ref.current.setLines([
      { key: '1.1', level: 1, ...cols, prefix: Prefix.BlockStart },
      { key: '1.2', level: 1, ...cols, prefix: Prefix.BlockMiddleLine },
      { key: '1.3', level: 1, ...cols, prefix: Prefix.BlockMiddleNone },
      { key: '1.4', level: 1, ...cols, prefix: Prefix.BlockEnd },
      { key: '2.1', level: 2, ...cols, prefix: Prefix.BlockStart },
      { key: '2.2', level: 2, ...cols, prefix: Prefix.BlockMiddleLine },
      { key: '2.3', level: 2, ...cols, prefix: Prefix.BlockMiddleNone },
      { key: '2.4', level: 2, ...cols, prefix: Prefix.BlockEnd },
      { key: '3.1', level: 3, ...cols, prefix: Prefix.BlockStart },
      { key: '3.2', level: 3, ...cols, prefix: Prefix.BlockMiddleLine },
      { key: '3.3', level: 3, ...cols, prefix: Prefix.BlockMiddleNone },
      { key: '3.4', level: 3, ...cols, prefix: Prefix.BlockEnd },
    ]);

    const expectedFrame = dedent`
      ┌─── l1 l2         r1 r2
      ├─ l1 l2           r1 r2
      │  l1 l2           r1 r2
      └─── l1 l2         r1 r2
      ├─┬─── l1 l2       r1 r2
      │ ├─ l1 l2         r1 r2
      │ │  l1 l2         r1 r2
      │ └─── l1 l2       r1 r2
      │ ├─┬─── l1 l2     r1 r2
      │ │ ├─ l1 l2       r1 r2
      │ │ │  l1 l2       r1 r2
      │ │ └─── l1 l2     r1 r2
    `;

    await new Promise(resolve => setTimeout(resolve, 50));

    expect(lastFrame()).toStrictEqual(expectedFrame);

    unmount();
  });

  it('render static lines full width', async () => {
    const ref: RefObject<StaticLinesRef | null> = { current: null };

    const { lastFrame, unmount } = render(<StaticLines ref={ref} />);

    ref.current?.setLines([
      { key: '1.1', level: 1, ...cols, prefix: Prefix.BlockStart },
      { key: '1.2', level: 1, ...cols, prefix: Prefix.BlockMiddleLine },
      { key: '1.3', level: 1, ...cols, prefix: Prefix.BlockMiddleNone },
      {
        key: '0',
        level: 1,
        isStatic: true,
        colsRight: [{ text: '123456789 123456789 123456789' }],
        prefix: Prefix.BlockMiddleNone,
      },
    ]);

    // default width in `ink-testing-library` is 100
    const expectedFrame = dedent`
      ┌─── l1 l2                                                                                     r1 r2
      ├─ l1 l2                                                                                       r1 r2
      │  l1 l2                                                                                       r1 r2
      │  123456789 123456789 123456789
    `;

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(lastFrame()).toStrictEqual(expectedFrame);

    unmount();
  });
});
