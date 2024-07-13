import type { TypedFlatConfigItem } from '@antfu/eslint-config';

export const yamlYarnrcRules: TypedFlatConfigItem = {
  name: 'culur/yarnrc-yml/rules',
  files: ['.yarnrc.yml'],
  rules: {
    'yaml/sort-keys': [
      'error',
      {
        pathPattern: '^packageExtensions$',
        order: {
          type: 'asc',
          caseSensitive: false,
          natural: true,
        },
      },
    ],
  },
};
