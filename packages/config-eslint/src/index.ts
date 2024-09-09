import antfu from '@antfu/eslint-config';
import { defineHasPackages } from '@culur/utils-packages';
import { sortPackageJson, vueRules } from './overrides';
import { defineOverride } from './types';
import { filenameRules, yamlYarnrcRules } from './rules';

export default function defineConfig(
  ...[options = {}, ...userConfigs]: Parameters<typeof antfu>
): ReturnType<typeof antfu> {
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
