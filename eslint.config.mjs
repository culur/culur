import defineConfig from '@culur/config-eslint';
import { yamlOrder, yamlYarnrcSortKeys } from '@culur/config-eslint/rules';

export default defineConfig({
  name: 'workspace/ignore',
  ignores: ['templates/template-vue-vite/**'],
}).override('culur/yarnrc-yml/rules', {
  files: ['.yarnrc.yml'],
  rules: {
    'yaml/sort-keys': [
      'error',
      {
        ...yamlYarnrcSortKeys.packageExtensions.packages,
        order: [
          { order: yamlOrder, keyPattern: /^@actions\/.+/.source },
          { order: yamlOrder, keyPattern: /eslint-.+/.source },
          { order: yamlOrder, keyPattern: /vue/.source },
          { order: yamlOrder },
        ],
      },
      yamlYarnrcSortKeys.packageExtensions.packages,
      yamlYarnrcSortKeys.packageExtensions.dependenciesTypes,
      yamlYarnrcSortKeys.packageExtensions.childPackages,
    ],
  },
});
