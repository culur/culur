import type { Tasks } from '~/item';
import { render } from 'ink-testing-library';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Logger } from '~/logger';

type DescribeLoggerParams = [
  rootName: string,
  callback: (
    root: Tasks<[]>,
    lastFrame: () => string | undefined,
  ) => Promise<void>,
  options?: { width?: number },
];

function describeLogger(name: string, ...args: DescribeLoggerParams) {
  describe(name, () => {
    suiteFactory(...args);
  });
}

describeLogger.only = function (name: string, ...args: DescribeLoggerParams) {
  // eslint-disable-next-line test/no-only-tests
  describe.only(name, () => {
    suiteFactory(...args);
  });
};

function suiteFactory(
  ...[rootName, callback, { width = 50 } = {}]: DescribeLoggerParams
) {
  beforeAll(() => {
    vi.mock('ink', async () => {
      const ink: typeof import('ink') = await vi.importActual('ink');
      return { ...ink, render };
    });

    vi.mock('ink-spinner', async () => {
      const { Text }: typeof import('ink') = await vi.importActual('ink');
      return {
        default: () => <Text>⠋ </Text>,
      };
    });

    vi.mock('~/components', async () => {
      const { Text }: typeof import('ink') = await vi.importActual('ink');
      const components: typeof import('~/components') =
        await vi.importActual('~/components');

      return {
        ...components,
        TextTimer: () => <Text>0.00s</Text>,
      };
    });
  });

  afterAll(() => {
    vi.unmock('~/components/text-timer');
  });

  it(rootName, async () => {
    const logger = new Logger(rootName, { width });
    const { root } = logger;

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    const { lastFrame } = logger.instance as ReturnType<typeof render>;

    await expect((() => callback(root, lastFrame))())
      .resolves //
      .toEqual(undefined);

    logger.unmount();
  });
}

export { describeLogger };
