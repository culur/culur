import type { BoxProps } from 'ink';
import type { LineColProps } from './line-cols.types';
import { Box, Spacer, Text } from 'ink';
import { range } from 'lodash-es';
import { DRAW } from '~/configs';
import { Icon, Prefix } from '~/types';
import { BoxIcon } from './box-icon';
import { DrawPattern } from './draw-pattern';
import { LineCols } from './line-cols';

export interface LineProps {
  level: number;
  prefix: Prefix;
  icon?: Icon | string;
  iconWidth?: number;
  colsLeft?: LineColProps[];
  colsRight?: LineColProps[];
}

export interface LinePropsWithKey extends LineProps {
  key: string;
}

const defaultCols: LineColProps[] = [];

export function Line({
  icon = Icon.None,
  iconWidth = DRAW.iconWidth,
  colsLeft = defaultCols,
  colsRight = defaultCols,
  level,
  prefix,
  ...boxProps
}: LineProps & BoxProps) {
  if (level <= 0)
    return (
      <Box {...boxProps}>
        <Text color="red">[Invalid level]</Text>
      </Box>
    );

  return (
    <Box {...boxProps}>
      <Box height="100%" flexShrink={0}>
        {prefix === Prefix.BlockStart && level === 1 && (
          <DrawPattern pattern="┌─" {...DRAW} />
        )}
        {prefix === Prefix.BlockStart && level > 1 && (
          <>
            {range(Math.max(0, level - 2)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...DRAW} />
            ))}
            <DrawPattern pattern="├─" {...DRAW} />
            <DrawPattern pattern="┬─" {...DRAW} />
            {/* <DrawLine pattern="│ " {...DRAW} /> */}
            {/* <DrawLine pattern="┌─" {...DRAW} /> */}
          </>
        )}

        {prefix === Prefix.BlockMiddleNone && (
          <>
            {range(Math.max(0, level)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...DRAW} />
            ))}
          </>
        )}
        {prefix === Prefix.BlockMiddleLine && (
          <>
            {range(Math.max(0, level - 1)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...DRAW} />
            ))}
            {/* <DrawLine pattern="│ " {...DRAW} /> */}
            <DrawPattern pattern="├─" {...DRAW} />
          </>
        )}

        {prefix === Prefix.BlockEnd && (
          <>
            {range(Math.max(0, level - 1)).map(value => (
              <DrawPattern key={value} pattern="│ " height="100%" {...DRAW} />
            ))}
            <DrawPattern pattern="└─" height={1} {...DRAW} />
          </>
        )}
      </Box>

      <Box width={1} />

      <BoxIcon icon={icon} {...DRAW} width={iconWidth} />

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
