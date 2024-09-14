import { OverrideConfig } from '~/types';

export const importsRules: OverrideConfig = {
  name: 'antfu/imports/rules',
  partialConfig: {
    rules: {
      'import/no-deprecated': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    },
  },
};
