import type { Theme } from '@inquirer/core';
import { makeTheme } from '@inquirer/core';
import type { PartialDeep } from '@inquirer/type';

type Text =
  | string //
  | [text: string, textType: keyof Theme['style']]
  | ((style: Theme['style']) => string);

export const getPrinter = <SpecificTheme extends object>(
  ...themes: ReadonlyArray<undefined | PartialDeep<Theme<SpecificTheme>>>
) => {
  const theme = makeTheme(themes);
  const defaultPrefix = theme.prefix;

  const formatText = (text: Text) => {
    switch (typeof text) {
      case 'function':
        return text(theme.style);
      case 'object':
        if (Array.isArray(text)) return theme.style[text[1]](text[0]);
        return String(text);
      case 'string':
      default:
        return text;
    }
  };

  const printText = (...texts: (Text | null)[]) => {
    const text = texts
      .filter((t): t is Text => !!t)
      .map(formatText)
      .join(' ');

    // eslint-disable-next-line no-console
    console.log(text);
  };

  const print = (...texts: (Text | null)[]) => {
    const prefix = texts[0] === null ? null : defaultPrefix;

    printText(prefix, ...texts);
  };

  return {
    print,
    printText,
  };
};

export const defaultPrint = getPrinter().printText;
