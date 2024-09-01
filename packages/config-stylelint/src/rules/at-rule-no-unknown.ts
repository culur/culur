import type { Packages } from '@culur/utils-packages';
import { defineRule, defineRules } from '~/utils';

// https://tailwindcss.com/docs/functions-and-directives
const directives = [
  'tailwind',
  'layer',
  'apply',
  'config',

  // https://v2.tailwindcss.com/docs/functions-and-directives
  // backwards compatible for v2
  'variants',
  'responsive',
  'screen',
];

export const atRuleNoUnknownRule = (packages: Partial<Packages>) =>
  defineRule<boolean, { ignoreAtRules: (string | RegExp)[] }>([
    true,
    { ignoreAtRules: packages.tailwind ? directives : [] },
  ]);

export const atRuleNoUnknownCSS = (packages: Partial<Packages>) =>
  defineRules({
    'at-rule-no-unknown': atRuleNoUnknownRule(packages),
  });

export const atRuleNoUnknownSCSS = (packages: Partial<Packages>) =>
  defineRules({
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': atRuleNoUnknownRule(packages),
  });
