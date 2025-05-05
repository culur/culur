import type { TextProps } from 'ink';
import figureSet from 'figures';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { useMemo } from 'react';
import { Icon } from '~/types';

export interface BoxIconProps {
  icon: Icon | string;
  width?: number;
  color?: TextProps['color'];
}

export const BoxIcon = ({ icon, width, color }: BoxIconProps) => {
  const boxProps = useMemo(
    () => ({
      width,
      minWidth: width,
      flexShrink: 0,
    }),
    [width],
  );

  switch (icon) {
    case Icon.None:
      return null;
    case Icon.Space:
      return <Box {...boxProps} />;
    case Icon.Info:
      return (
        <Box {...boxProps}>
          <Text color={color ?? 'blue'}>{figureSet.info}</Text>
        </Box>
      );
    case Icon.Pending:
      return (
        <Box {...boxProps}>
          <Text color={color ?? 'gray'}>{figureSet.circleDotted}</Text>
        </Box>
      );
    case Icon.Running:
      return (
        <Box {...boxProps}>
          <Text color={color ?? 'yellow'}>
            <Spinner />
          </Text>
        </Box>
      );
    case Icon.Success:
      return (
        <Box {...boxProps}>
          <Text color={color ?? 'green'}>{figureSet.tick}</Text>
        </Box>
      );
    case Icon.Error:
      return (
        <Box {...boxProps}>
          <Text color={color ?? 'red'}>{figureSet.cross}</Text>
        </Box>
      );
    default:
      return (
        <Box {...boxProps} height={1}>
          <Text color={color}>{icon}</Text>
        </Box>
      );
  }
};
