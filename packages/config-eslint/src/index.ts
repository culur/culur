import antfu from '@antfu/eslint-config';
import { sortPackageJson } from './overrides/sort-package-json';
import { filenameRules } from './rules/filename';
import { defineOverride } from './types';

export default function defineConfig(
  ...[options = {}, ...userConfigs]: Parameters<typeof antfu>
) {
  return antfu(
    {
      isInEditor: false,
      stylistic: false,
      formatters: false,
      ...options,
    },
    filenameRules,
    ...userConfigs,
  ).override(...defineOverride(sortPackageJson));
}
