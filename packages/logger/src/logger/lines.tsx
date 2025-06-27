import type { Key } from 'ink';
import type { LineProps } from '~/components';
import type { IRootObject } from '~/item';
import process from 'node:process';
import { Static, Text, useInput } from 'ink';
import { useImperativeHandle, useState } from 'react';
import { Line } from '~/components';

export interface LinesRef {
  setLines: React.Dispatch<{
    staticLines: LineProps[];
    dynamicLines: LineProps[];
  }>;
}

export const Lines = ({
  ref,
  ...props
}: NonNullable<IRootObject['props']> & {
  ref: React.RefObject<LinesRef | null>;
}) => {
  const [lines, setLines] = useState<{
    staticLines: LineProps[];
    dynamicLines: LineProps[];
  }>({
    staticLines: [],
    dynamicLines: [],
  });

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
      <Static items={lines.staticLines}>
        {line => <Line {...props} {...line} key={line.key} />}
      </Static>
      {lines.dynamicLines.map(line => (
        <Line {...props} {...line} key={line.key} isStatic={false} />
      ))}
      {previousInput && previousInput.key.escape && (
        <Text color="yellow">Press ESC again to exit.</Text>
      )}
    </>
  );
};
