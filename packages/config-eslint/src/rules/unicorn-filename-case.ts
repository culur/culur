import type { TypedFlatConfigItem } from '@antfu/eslint-config';

export const unicornFilenameCase: TypedFlatConfigItem = {
  files: ['**/*.ts', '**/*.js'],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['README.md'],
      },
    ],
  },
};
