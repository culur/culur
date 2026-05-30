import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import type { YamlSortKeysRecord } from './yaml-order';
import { yamlOrder } from './yaml-order';

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
