import type { LineColProps } from './line-cols.types';
import { uniqueId } from 'lodash-es';
import { LineCol } from './line-col';

export function LineCols({ cols }: { cols: LineColProps[] }) {
  return cols.map((col, index) => (
    <LineCol key={uniqueId()} spaceBefore={index > 0} {...col} />
  ));
}
