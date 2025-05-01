import antfu from '@antfu/eslint-config';
import { defineHasPackages } from '@culur/utils-packages';
import { importsRules, sortPackageJson, vueRules } from './overrides';
import { testRules } from './overrides/test-rules';
import { filenameRules, renovateJsonRules, yarnrcYmlRules } from './rules';
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
    yarnrcYmlRules,
    renovateJsonRules,
    ...userConfigs,
  );

  config.override(...defineOverride(importsRules));
  config.override(...defineOverride(sortPackageJson));
  config.override(...defineOverride(testRules));

  if (hasVue()) {
    config.override(...defineOverride(vueRules));
  }

  return config;
}
