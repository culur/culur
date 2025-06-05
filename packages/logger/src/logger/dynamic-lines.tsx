import type { Key } from 'ink';
import type { LineProps } from '../components/line';
import type { IRootObject } from '~/item';
import process from 'node:process';
import { Text, useInput } from 'ink';
import { useImperativeHandle, useState } from 'react';
import { Line } from '../components/line';

export interface DynamicLinesRef {
  setLines: React.Dispatch<LineProps[]>;
}

export const DynamicLines = ({
  ref,
  ...props
}: NonNullable<IRootObject['props']> & {
  ref: React.RefObject<DynamicLinesRef | null>;
}) => {
  const [lines, setLines] = useState<LineProps[]>([]);

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
      {lines.map(line => (
        <Line {...props} {...line} key={line.key} isStatic={false} />
      ))}

      {previousInput && previousInput.key.escape && (
        <Text color="yellow">Press ESC again to exit.</Text>
      )}
    </>
  );
};
