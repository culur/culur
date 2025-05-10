import type { LineColProps } from './line-cols.types';
import { uniqueId } from 'es-toolkit/compat';
import { LineCol } from './line-col';

export function LineCols({ cols }: { cols: LineColProps[] }) {
  return cols.map((col, index) => (
    <LineCol key={uniqueId()} spaceBefore={index > 0} {...col} />
  ));
}
