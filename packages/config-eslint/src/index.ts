import antfu from '@antfu/eslint-config';
import { defineHasPackages } from '@culur/utils-packages';
import { importsRules, sortPackageJson, vueRules } from './overrides';
import { filenameRules, renovateJsonRules, yamlYarnrcRules } from './rules';
import { defineOverride } from './types';

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
    renovateJsonRules,
    ...userConfigs,
  );

  config.override(...defineOverride(importsRules));
  config.override(...defineOverride(sortPackageJson));

  if (hasVue()) {
    config.override(...defineOverride(vueRules));
  }

  return config;
}
