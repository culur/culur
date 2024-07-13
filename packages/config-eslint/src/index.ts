import antfu from '@antfu/eslint-config';
import { sortPackageJson } from './overrides/sort-package-json';
import { unicornFilenameCase } from './rules/unicorn-filename-case';
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
    unicornFilenameCase,
    ...userConfigs,
  ).override(...defineOverride(sortPackageJson));
}
