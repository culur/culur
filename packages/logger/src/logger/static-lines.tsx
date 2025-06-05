import type { LineProps } from '../components/line';
import type { IRootObject } from '~/item';
import { useImperativeHandle, useState } from 'react';
import { Line } from '../components/line';

export interface StaticLinesRef {
  setLines: React.Dispatch<LineProps[]>;
}

export const StaticLines = ({
  ref,
  ...props
}: NonNullable<IRootObject['props']> & {
  ref: React.RefObject<StaticLinesRef | null>;
}) => {
  const [lines, setLines] = useState<LineProps[]>([]);

  useImperativeHandle(ref, () => ({ setLines }));

  return lines.map(line => (
    <Line {...props} {...line} key={line.key} isStatic />
  ));
};
