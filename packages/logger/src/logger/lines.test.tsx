import type { RefObject } from 'react';
import type { Mock } from 'vitest';
import type { LinesRef } from './lines';
import process from 'node:process';
import dedent from 'dedent';
import { render } from 'ink-testing-library';
import { afterAll, assert, beforeAll, describe, expect, it, vi } from 'vitest';
import { Prefix } from '~/types';
import { Lines } from './lines';

const cols = {
  isStatic: true,
  colsLeft: [{ text: 'l1' }, { text: 'l2' }],
  colsRight: [{ text: 'r1' }, { text: 'r2' }],
};

describe('dynamic lines', () => {
  it('render dynamic lines', async () => {
    const ref: RefObject<LinesRef | null> = { current: null };
    const { lastFrame, unmount } = render(<Lines ref={ref} width={24} />);

    assert(ref.current, "ref.current shouldn't be null");

    ref.current.setLines({
      staticLines: [
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
      ],
      dynamicLines: [],
    });

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
    expect(lastFrame()).toStrictEqual(`${expectedFrame}\n`);

    unmount();
  });

  it('render dynamic lines full width', async () => {
    const ref: RefObject<LinesRef | null> = { current: null };
    const { lastFrame, unmount } = render(<Lines ref={ref} width={100} />);

    ref.current?.setLines({
      staticLines: [
        { key: '1.1', level: 1, ...cols, prefix: Prefix.BlockStart },
        { key: '1.2', level: 1, ...cols, prefix: Prefix.BlockMiddleLine },
        { key: '1.3', level: 1, ...cols, prefix: Prefix.BlockMiddleNone },
      ],
      dynamicLines: [
        {
          key: '0',
          level: 1,
          isStatic: true,
          colsRight: [{ text: '123456789 123456789 123456789' }],
          prefix: Prefix.BlockMiddleNone,
        },
      ],
    });

    // default width in `ink-testing-library` is 100
    const expectedFrame = dedent`
      ┌─── l1 l2                                                                                     r1 r2
      ├─ l1 l2                                                                                       r1 r2
      │  l1 l2                                                                                       r1 r2
      │  123456789 123456789 123456789
    `;

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(lastFrame()).toStrictEqual(`${expectedFrame}`);

    unmount();
  });
});

describe('dynamic lines input', () => {
  let exitSpy: Mock<(code?: number | string | null) => never>;
  beforeAll(() => {
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      return undefined as never;
    });
  });

  afterAll(() => {
    exitSpy.mockRestore();
  });

  it('render input', async () => {
    const ref: RefObject<LinesRef | null> = { current: null };
    const { lastFrame, unmount, stdin } = render(
      <Lines ref={ref} width={24} />,
    );

    expect(lastFrame()).toStrictEqual(``);

    await new Promise(resolve => setTimeout(resolve, 1000));
    stdin.write('\x1B');

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(lastFrame()).toStrictEqual('Press ESC again to exit.');

    await new Promise(resolve => setTimeout(resolve, 50));
    stdin.write('\x1B');

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(exitSpy).toHaveBeenCalledWith(0);
    unmount();
  });
});
