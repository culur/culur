import type { TextProps } from 'ink';
import { hrtime } from 'node:process';
import { Text } from 'ink';
import { useEffect, useState } from 'react';

const getTime = ({
  startTime,
  endTime = hrtime.bigint(),
}: {
  startTime?: bigint | null;
  endTime?: bigint;
}) => {
  return `${(typeof startTime === 'bigint' //
    ? Number(endTime - startTime) / 1000000000
    : 0
  ).toFixed(2)}s`;
};

export function TextTimer({
  startTime,
  endTime,
  ...props
}: {
  startTime?: bigint;
  endTime?: bigint;
} & Omit<TextProps, 'children'>) {
  const [duration, setDuration] = useState(() =>
    getTime({ startTime, endTime }),
  );

  useEffect(() => {
    if (typeof startTime === 'bigint' && typeof endTime === 'bigint') {
      setDuration(getTime({ startTime, endTime }));
      return;
    }

    const intervalId = setInterval(() => {
      setDuration(getTime({ startTime, endTime }));
    }, 10);
    return () => clearInterval(intervalId);
  }, [endTime, startTime]);

  return <Text {...props}>{duration}</Text>;
}
