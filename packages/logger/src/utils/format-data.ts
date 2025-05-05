import process from 'node:process';
import chalk from 'chalk';
import prettier from 'prettier';
import { DRAW } from '~/configs';
import { stringify } from './stringify';

function getPrintWidth(level: number, width: number | null | undefined) {
  if (width === null) return undefined;

  const terminalWidth =
    width === undefined ? (process.stdout.columns ?? 0) : width;
  const levelIndent = (level + 1) * DRAW.middleWidth + 1 + DRAW.iconWidth;
  return terminalWidth - levelIndent;
}

export async function formatData({
  level,
  width,
  data,
}: {
  level: number;
  width: number | undefined | null;
  data: unknown;
}) {
  const codeRaw = `Data = ${stringify(data)}`;
  const printWidth = getPrintWidth(level, width);

  const codePrettier = await prettier //
    .format(codeRaw, {
      parser: 'babel',
      semi: false,
      endOfLine: 'lf',
      singleQuote: false,
      printWidth,
    });
  const codeFormatted = codePrettier
    .replace(/^Data =/, chalk.gray('Data ='))
    .replace(/\n$/, '');

  return codeFormatted;
}
