import type { Rules, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { Linter } from 'eslint';

type YamlSortKeys =
  NonNullable<Rules['yaml/sort-keys']> extends Linter.RuleEntry<infer F>
    ? F
    : never;

type YamlSortKeysRecord = YamlSortKeys[0];

export const yamlOrder = {
  type: 'asc',
  caseSensitive: false,
  natural: true,
} as const;

export const yamlYarnrcSortKeys = {
  packageExtensions: {
    packages: {
      pathPattern: /^packageExtensions$/.source,
      order: yamlOrder,
    },
    dependenciesTypes: {
      pathPattern: /^packageExtensions(?:\[".+"\]|\.[^.]+)$/.source,
      order: yamlOrder,
    },
    childPackages: {
      pathPattern:
        /^packageExtensions(?:\[".+"\]|\.[^.]+)\.(?:dependencies|peerDependencies|peerDependenciesMeta)$/
          .source,
      order: yamlOrder,
    },
  },
} satisfies Record<string, Record<string, YamlSortKeysRecord>>;

export const yamlYarnrcRules: TypedFlatConfigItem = {
  name: 'culur/yarnrc-yml/rules',
  files: ['.yarnrc.yml'],
  rules: {
    'yaml/sort-keys': [
      'error',
      yamlYarnrcSortKeys.packageExtensions.packages,
      yamlYarnrcSortKeys.packageExtensions.dependenciesTypes,
      yamlYarnrcSortKeys.packageExtensions.childPackages,
    ],
  },
};
