import type { BoxProps, TextProps } from 'ink';
import figureSet from 'figures';
import { Box, Text } from 'ink';

const boxProps: BoxProps = {
  borderStyle: 'single',
  borderTop: false,
  borderLeft: false,
  borderRight: false,
  borderBottom: false,
};

export interface DrawPatternProps {
  pattern:
    | '│ ' //
    | '┌─'
    | '┬─'
    | '├─'
    | '└─';
  color: TextProps['color'];
  middleWidth: number;
  startEndWidth: number;
}

export function DrawPattern({
  pattern, //
  middleWidth,
  startEndWidth,
  color,
  ...props
}: DrawPatternProps & BoxProps) {
  switch (pattern) {
    case '│ ':
      return (
        <Box
          {...boxProps}
          {...props} //
          width={middleWidth}
          height="100%"
          borderColor={color}
          borderLeft
        />
      );
    case '┌─':
    case '┬─':
    case '├─':
    case '└─': {
      const width = pattern === '├─' ? middleWidth : startEndWidth;
      const corner = {
        '┌─': figureSet.lineDownRight,
        '┬─': figureSet.lineDownLeftRight,
        '├─': figureSet.lineUpDownRight,
        '└─': figureSet.lineUpRight,
      }[pattern];

      return (
        <Box
          {...boxProps}
          width={width}
          minWidth={width}
          flexDirection="column"
          {...props}
        >
          <Box>
            <Text color={color} children={corner} />
            <Box
              {...boxProps} //
              flexGrow={1}
              borderColor={color}
              borderTop
            />
          </Box>
          <Box
            {...boxProps}
            width={2}
            minWidth={2}
            flexGrow={1}
            borderColor={color}
            borderLeft
          />
        </Box>
      );
    }
    default:
      return null;
  }
}
