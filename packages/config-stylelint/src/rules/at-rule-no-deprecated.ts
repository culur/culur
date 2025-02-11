import type { Packages } from '@culur/utils-packages';
import { defineRule, defineRules } from '~/utils';

// https://github.com/stylelint/stylelint/blob/16.14.1/lib/reference/atKeywords.mjs#L3

export const atRuleNoDeprecatedRule = (packages: Partial<Packages>) =>
  defineRule<boolean, { ignoreAtRules: (string | RegExp)[] }>([
    true,
    { ignoreAtRules: packages.tailwind ? ['apply'] : [] },
  ]);

export const atRuleNoDeprecated = (packages: Partial<Packages>) =>
  defineRules({
    'at-rule-no-deprecated': atRuleNoDeprecatedRule(packages),
  });
