import type { Config } from 'prettier';
import { platform } from 'node:os';

export default function defineConfig(config: Config = {}): Config {
  const isWin = platform() === 'win32';

  const defaultConfig = {
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
          '.babelrc', // (alias for .babelrc.json) https://babeljs.io/docs/config-files#supported-file-extensions
          '.czrc', // https://github.com/commitizen/cz-cli
          '.eslintrc', // https://eslint.org/docs/latest/use/configure/configuration-files-deprecated
          '.gqlconfig', // https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode
          '.ncurc', // https://github.com/raineorshine/npm-check-updates?tab=readme-ov-file#config-file
          '.prettierrc', // (JSON or YAML) https://prettier.io/docs/en/configuration.html
          '.releaserc', // https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration-file
          '.stylelintrc', // https://stylelint.io/user-guide/configure/
          '*.code-workspace', // https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces
        ],
        options: { parser: 'json' },
      },
      {
        files: [
          // alphabetical order
          '*.md',
          '*.ya?ml',
          'package*.json',
        ],
        options: { tabWidth: 2 },
      },

      // `endOfLine` based on `.gitattributes`
      // https://github.com/gitattributes/gitattributes/blob/master/Web.gitattributes
      {
        files: [
          // alphabetical order
          '.husky/*',
          '*.bash',
          '*.ipynb',
          '*.sh',
          'package.json',
          'package.json',
          'pnpm-lock.yaml',
        ],
        options: { endOfLine: 'lf' },
      },
      {
        files: [
          // alphabetical order
          '*.bat',
          '*.cmd',
          '*.ps1',
        ],
        options: { endOfLine: 'crlf' },
      },
    ],
  } satisfies Config;

  const { overrides, ...options } = config;
  const { overrides: defaultOverrides, ...defaultOptions } = defaultConfig;

  return {
    ...defaultOptions,
    ...options,
    overrides: [...defaultOverrides, ...(overrides ?? [])],
  };
}
