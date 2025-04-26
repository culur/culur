import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { packageRuleOrder } from './order/package-rule';
import { rootOrder } from './order/root';

export const renovateJsonRules: TypedFlatConfigItem = {
  name: 'culur/renovate-json/rules',
  files: [
    // https://docs.renovatebot.com/configuration-options/#configuration-options
    'renovate.json',
    'renovate.json5',
    '.github/renovate.json',
    '.github/renovate.json5',
    '.gitlab/renovate.json',
    '.gitlab/renovate.json5',
    '.renovaterc',
    '.renovaterc.json',
    '.renovaterc.json5',
  ],
  rules: {
    'jsonc/sort-keys': [
      'error',
      {
        pathPattern: '^$',
        order: rootOrder,
      },
      {
        pathPattern: '^packageRules\\[\\d+\\]$',
        order: packageRuleOrder,
      },
    ],
  },
};
