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

export const yarnrcYmlSortKeys = {
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

export const yarnrcYmlRules: TypedFlatConfigItem = {
  name: 'culur/yarnrc-yml/rules',
  files: ['.yarnrc.yml'],
  rules: {
    'yaml/sort-keys': [
      'error',
      yarnrcYmlSortKeys.packageExtensions.packages,
      yarnrcYmlSortKeys.packageExtensions.dependenciesTypes,
      yarnrcYmlSortKeys.packageExtensions.childPackages,
    ],
  },
};
