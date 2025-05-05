import type { RefObject } from 'react';
import type { RootRef } from './root';
import txt from 'dedent';
import { render } from 'ink-testing-library';
import { describe, expect, it } from 'vitest';
import { Prefix } from '~/types';
import { Root } from './root';

const cols = {
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

    expect(lastFrame()).toStrictEqual(txt`
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
    `);

    unmount();
  });
});
