import type { TypedFlatConfigItem } from '@antfu/eslint-config';

export const filenameRules: TypedFlatConfigItem = {
  name: 'culur/filename/rules',
  files: [
    '**/*.?(c|m){js,ts}?(x)',
    '**/*.vue',
    '**/*.md?(x)',
    '**/*.json?(c)',
    '**/*.y?(a)ml',
    '**/*.gql',
    '**/*.graphql',
  ],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: [
          '^ADR-\\w+\\.md',
          '^ARCHITECTURE\\.md',
          '^CHANGELOG\\.md',
          '^CONTRIBUTING\\.md',
          '^README\\.md',
        ],
      },
    ],
  },
};
