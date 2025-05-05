import type { RefObject } from 'react';
import type { RootRef } from './root';
import dedent from 'dedent';
import { render } from 'ink-testing-library';
import { describe, expect, it } from 'vitest';
import { Prefix } from '~/types';
import { Root } from './root';

const cols = {
  isStatic: true,
  colsLeft: [{ text: 'l1' }, { text: 'l2' }],
  colsRight: [{ text: 'r1' }, { text: 'r2' }],
};

describe('root', () => {
  it('render root', () => {
    const ref: RefObject<RootRef> = { current: null };

    const { lastFrame, unmount } = render(<Root ref={ref} width={24} />);

    ref.current?.setLines([
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

    // add \n at the end due to the <Static> component
    expect(lastFrame()).toStrictEqual(`${expectedFrame}\n`);

    unmount();
  });

  it('render root full width', () => {
    const ref: RefObject<RootRef> = { current: null };

    const { lastFrame, unmount } = render(<Root ref={ref} />);

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

    const expectedFrame = dedent`
      ┌─── l1 l2                 r1 r2
      ├─ l1 l2                   r1 r2
      │  l1 l2                   r1 r2
      │  123456789 123456789 123456789
    `;

    // add \n at the end due to the <Static> component
    expect(lastFrame()).toStrictEqual(`${expectedFrame}\n`);

    unmount();
  });
});
