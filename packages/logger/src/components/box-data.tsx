import type { ComponentRef } from 'react';
import chalk from 'chalk';
import { Box, measureElement } from 'ink';
import SyntaxHighlight from 'ink-syntax-highlight';
import prettier from 'prettier';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { stringify } from './box-data.stringify';

export function BoxData({ data }: { data: unknown }) {
  //! Width
  const ref = useRef<ComponentRef<typeof Box>>(null);

  const getWidth = useCallback(() => {
    if (!ref.current) return null;
    return measureElement(ref.current).width;
  }, [ref]);
  const [width, setWidth] = useState(() => getWidth());

  useEffect(() => setWidth(getWidth), [getWidth]);

  //! Code
  const jsCode = useMemo(() => `Data = ${stringify(data)}`, [data]);

  const [code, setCode] = useState(jsCode);

  useEffect(() => {
    prettier //
      .format(jsCode, {
        parser: 'babel',
        semi: false,
        endOfLine: 'lf',
        singleQuote: false,
        printWidth: width ?? undefined,
      })
      .then(formattedCode =>
        setCode(
          formattedCode
            .replace(/^Data =/, chalk.gray('Data ='))
            .replace(/\n$/, ''),
        ),
      );
  }, [jsCode, width]);

  return (
    <Box ref={ref} flexGrow={1}>
      <SyntaxHighlight
        code={code}
        language="js"
        theme={{
          string: chalk.green,
          number: chalk.yellow,
          literal: chalk.gray,
        }}
      />
    </Box>
  );
}
