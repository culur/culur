import type { TypedFlatConfigItem } from '@antfu/eslint-config';

export const yamlYarnrcRules: TypedFlatConfigItem = {
  name: 'culur/yarnrc-yml/rules',
  files: ['.yarnrc.yml'],
  rules: {
    'yaml/sort-keys': [
      'error',
      {
        pathPattern: /^packageExtensions$/.source,
        order: {
          type: 'asc',
          caseSensitive: false,
          natural: true,
        },
      },
      {
        pathPattern: /^packageExtensions(?:\[".+"\]|\.[^.]+)$/.source,
        order: [
          'dependencies', //
          'peerDependencies',
          'peerDependenciesMeta',
        ],
      },
      {
        pathPattern:
          /^packageExtensions(?:\[".+"\]|\.[^.]+)\.(?:dependencies|peerDependencies|peerDependenciesMeta)$/
            .source,
        order: {
          type: 'asc',
          caseSensitive: false,
          natural: true,
        },
      },
    ],
  },
};
