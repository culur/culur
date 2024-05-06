import { defineObject } from '@culur/types';
import { platform } from 'os';
import type { Config } from 'prettier';

export default function definePrettierConfig(config: Config = {}): Config {
  const isWin = platform() === 'win32';

  const defaultConfig = defineObject<Config>()({
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'all',
    bracketSpacing: true,
    arrowParens: 'avoid',
    htmlWhitespaceSensitivity: 'ignore',
    printWidth: 80,
    endOfLine: isWin ? 'crlf' : 'lf',
    overrides: [
      {
        files: [
          // alphabetical order
          '.babelrc',
          '.czrc',
          '.eslintrc',
          '.gqlconfig',
          '.ncurc',
          '.prettierrc',
          '.releaserc',
          '.stylelintrc',
          '*.code-workspace',
        ],
        options: { parser: 'json' },
      },
      {
        files: [
          // alphabetical order
          'package.json',
          'package-lock.json',
          '*.md',
          '*.yml',
        ],
        options: { tabWidth: 2 },
      },
    ],
  });

  const { overrides, ...options } = config;
  const { overrides: defaultOverrides, ...defaultOptions } = defaultConfig;

  return {
    ...defaultOptions,
    ...options,
    overrides: [...defaultOverrides, ...(overrides ?? [])],
  };
}
