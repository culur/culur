import type { BoxProps, TextProps } from 'ink';
import type { LineColProps } from './line-cols.types';
import { Box, Spacer, Text } from 'ink';
import { range } from 'lodash-es';
import { DRAW } from '~/configs';
import { Icon, Prefix } from '~/types';
import { BoxIcon } from './box-icon';
import { DrawPattern } from './draw-pattern';
import { LineCols } from './line-cols';

export interface LineProps {
  key: string;
  level: number;
  prefix: Prefix;
  isStatic: boolean;
  icon?: Icon | string;
  iconWidth?: number;
  colsLeft?: LineColProps[];
  colsRight?: LineColProps[];
}

const defaultCols: LineColProps[] = [];

export function Line({
  icon = Icon.None,
  iconWidth = DRAW.iconWidth,
  colsLeft = defaultCols,
  colsRight = defaultCols,
  level,
  prefix,
  isStatic,
  ...boxProps
}: LineProps & BoxProps) {
  const color: TextProps['color'] = isStatic ? 'cyan' : 'yellow';
  const drawProps = { ...DRAW, color };

  if (level <= 0) {
    return (
      <Box {...boxProps}>
        <Text color="red">[Invalid level]</Text>
      </Box>
    );
  }

  return (
    <Box {...boxProps}>
      <Box height="100%" flexShrink={0}>
        {prefix === Prefix.BlockStart && level === 1 && (
          <DrawPattern pattern="┌─" {...drawProps} /> //
        )}
        {prefix === Prefix.BlockStart && level > 1 && (
          <>
            {range(Math.max(0, level - 2)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...drawProps} />
            ))}
            <DrawPattern pattern="├─" {...drawProps} />
            <DrawPattern pattern="┬─" {...drawProps} />
            {/* <DrawLine pattern="│ " {...props} /> */}
            {/* <DrawLine pattern="┌─" {...props} /> */}
          </>
        )}

        {prefix === Prefix.BlockMiddleNone && (
          <>
            {range(Math.max(0, level)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...drawProps} />
            ))}
          </>
        )}
        {prefix === Prefix.BlockMiddleLine && (
          <>
            {range(Math.max(0, level - 1)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...drawProps} />
            ))}
            {/* <DrawLine pattern="│ " {...props} /> */}
            <DrawPattern pattern="├─" {...drawProps} />
          </>
        )}

        {prefix === Prefix.BlockEnd && (
          <>
            {range(Math.max(0, level - 1)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...drawProps} />
            ))}
            <DrawPattern pattern="└─" height={1} {...drawProps} />
          </>
        )}
      </Box>

      <Box width={1} />

      <BoxIcon icon={icon} {...drawProps} width={iconWidth} />

      <Box flexGrow={1}>
        <LineCols cols={colsLeft} />

        {colsRight.length !== 0 && colsLeft.length !== 0 && (
          <Box minWidth={1} flexGrow={1}>
            <Spacer />
          </Box>
        )}

        <LineCols cols={colsRight} />
      </Box>
    </Box>
  );
}
