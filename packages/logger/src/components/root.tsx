import type { ReactNode } from 'react';
import type { LineProps } from './line';
import type { IRootObject } from '~/item';
import { Static } from 'ink';
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

    // // eslint-disable-next-line no-console
    // console.log('🍓', {
    //   title: lines[0]?.colsLeft?.[0]?.text,
    //   lines: lines.map(l => l.key),
    //   static: linesGroup.linesStatic.map(l => l.key),
    //   dynamic: linesGroup.linesDynamic.map(l => l.key),
    // });

    useImperativeHandle(ref, () => ({ setLines }));

    return (
      <>
        <Static items={linesGroup.linesStatic}>
          {line => <Line {...props} {...line} key={line.key} />}
        </Static>
        {linesGroup.linesDynamic.map(line => (
          <Line {...props} {...line} key={line.key} />
        ))}
      </>
    );
  },
);
