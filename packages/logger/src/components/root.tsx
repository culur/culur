import type { Key } from 'ink';
import type { ReactNode } from 'react';
import type { LineProps } from './line';
import type { IRootObject } from '~/item';
import process from 'node:process';
import { Static, Text, useInput } from 'ink';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Line } from './line';

export interface RootRef {
  setLines: React.Dispatch<React.SetStateAction<LineProps[]>>;
}

export const Root: (
  props: NonNullable<IRootObject['props']> & { ref: React.RefObject<RootRef> },
) => ReactNode = forwardRef<RootRef, NonNullable<IRootObject['props']>>(
  (props, ref) => {
    const [lines, setLines] = useState<LineProps[]>([]);

    const linesGroup = useMemo(() => {
      const linesStatic = [];
      const linesDynamic = [];
      let isMeetNonStatic = false;

      for (const line of lines) {
        if (!isMeetNonStatic) {
          if (line.isStatic) {
            linesStatic.push(line);
          } else {
            linesDynamic.push(line);
            isMeetNonStatic = true;
          }
        } else {
          linesDynamic.push(line);
        }
      }

      return { linesStatic, linesDynamic };
    }, [lines]);

    useImperativeHandle(ref, () => ({ setLines }));

    const [previousInput, setPreviousInput] = useState<{
      input: string;
      key: Key;
    } | null>(null);

    useInput((input, key) => {
      if (previousInput && previousInput.key.escape && key.escape) {
        process.exit(0);
      }
      setPreviousInput({ input, key });
    });

    return (
      <>
        <Static items={linesGroup.linesStatic}>
          {line => <Line {...props} {...line} key={line.key} />}
        </Static>
        {linesGroup.linesDynamic.map(line => (
          <Line {...props} {...line} key={line.key} isStatic={false} />
        ))}
        {previousInput && previousInput.key.escape && (
          <Text color="yellow">Press ESC again to exit.</Text>
        )}
      </>
    );
  },
);
