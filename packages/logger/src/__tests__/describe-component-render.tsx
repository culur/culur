import type { BoxProps } from 'ink';
import type { ReactElement } from 'react';
import { Box, Text } from 'ink';
import { render } from 'ink-testing-library';
import { describe, expect, it } from 'vitest';

export type BaseTestCase =
  | { text: string } //
  | { expectFn: (frame: string | undefined) => void };

export function describeComponentRender<
  TTestCase extends object | { name?: string },
>({
  name,
  cases,
  delay,
  node,
  text,
  hasWrapper = true,
  boxProps,
  itName = '$name ($text)',
}: {
  name: string;
  delay?: number;
  cases: (TTestCase & BaseTestCase & { boxProps?: BoxProps })[];
  itName?: string;
} & {
  node: (data: TTestCase) => ReactElement;
  text?: (data: TTestCase & BaseTestCase) => string;
  hasWrapper?: boolean;
  boxProps?: BoxProps;
}) {
  const getNode = (testCase: TTestCase & { boxProps?: BoxProps }) => (
    <Box {...boxProps} {...testCase.boxProps}>
      {hasWrapper && <Text>Prefix|</Text>}
      {node(testCase)}
      {hasWrapper && <Text>|Suffix</Text>}
    </Box>
  );

  const getText = (testCase: TTestCase & { text: string }) => {
    if (text) return text(testCase);
    if (hasWrapper) return `Prefix|${testCase.text}|Suffix`;
    return testCase.text;
  };

  const expectFn = (
    frame: string | undefined,
    testCase: TTestCase & BaseTestCase,
  ) => {
    if ('expectFn' in testCase) {
      testCase.expectFn(frame);
    } else if ('text' in testCase) {
      expect(frame).toStrictEqual(getText(testCase));
    } else {
      throw new Error('Invalid test case');
    }
  };

  describe(name, () => {
    // eslint-disable-next-line test/expect-expect
    it.each(cases)(itName, async testCase => {
      const { lastFrame, unmount } = render(getNode(testCase));

      if (delay) await new Promise(resolve => setTimeout(resolve, delay));

      expectFn(lastFrame(), testCase);

      unmount();
    });
  });
}
