import antfu from '@antfu/eslint-config';
import { defineHasPackages } from '@culur/utils-packages';
import { sortPackageJson } from './overrides/sort-package-json';
import { vueRules } from './overrides/vue-rules';
import { filenameRules } from './rules/filename';
import { yamlYarnrcRules } from './rules/yarnrc-yml';
import { defineOverride } from './types';

export default function defineConfig(
  ...[options = {}, ...userConfigs]: Parameters<typeof antfu>
) {
  const { hasVue } = defineHasPackages({ vue: !!options.vue });

  const config = antfu(
    {
      isInEditor: false,
      stylistic: false,
      formatters: false,
      ...options,
    },
    filenameRules,
    yamlYarnrcRules,
    ...userConfigs,
  );

  config.override(...defineOverride(sortPackageJson));

  if (hasVue()) {
    config.override(...defineOverride(vueRules));
  }

  return config;
}
