import type { LineColProps } from './line-cols.types';
import { Box, Text } from 'ink';
import stringWidth from 'string-width';

const getWidth = (col: LineColProps) => {
  switch (typeof col.text) {
    case 'object':
      return col.width;
    case 'string':
    default: {
      if (col.width === 'wrap') return undefined;
      if (col.width === 'no-wrap') return stringWidth(col.text);
      return col.width;
    }
  }
};

export function LineCol({
  spaceBefore,
  ...props
}: {
  spaceBefore?: boolean;
} & LineColProps) {
  const width = getWidth(props);
  return (
    <>
      {spaceBefore && <Box width={1} minWidth={1}></Box>}
      {width === undefined && typeof props.text === 'object' ? (
        props.text
      ) : (
        <Box
          // ink 8 only accepts a number for `minWidth`, `width` still takes a percentage
          minWidth={typeof width === 'number' ? width : undefined}
          width={width}
        >
          {typeof props.text === 'object' && props.text}
          {typeof props.text === 'string' && (
            <Text {...props}>{props.text}</Text>
          )}
        </Box>
      )}
    </>
  );
}
