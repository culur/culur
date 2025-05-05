import type { BoxProps } from 'ink';
import type { ReactNode } from 'react';
import type { LinePropsWithKey } from './line';
import { Box } from 'ink';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Line } from './line';

export interface RootRef {
  setLines: React.Dispatch<React.SetStateAction<LinePropsWithKey[]>>;
}

export const Root: (
  props: BoxProps & { ref: React.RefObject<RootRef> },
) => ReactNode = forwardRef<RootRef, BoxProps>((props, ref) => {
  const [lines, setLines] = useState<LinePropsWithKey[]>([]);

  useImperativeHandle(ref, () => ({
    setLines,
  }));

  return (
    <Box width="100%" {...props} flexDirection="column">
      {lines.map(record => (
        <Line {...record} key={record.key} />
      ))}
    </Box>
  );
});
