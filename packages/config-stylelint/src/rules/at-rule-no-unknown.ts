import { hasTailwind } from '@culur/utils-packages';
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

export const atRuleNoUnknownRule = () =>
  defineRule<boolean, { ignoreAtRules: (string | RegExp)[] }>([
    true,
    { ignoreAtRules: hasTailwind() ? directives : [] },
  ]);

export const atRuleNoUnknownCSS = () =>
  defineRules({
    'at-rule-no-unknown': atRuleNoUnknownRule(),
  });

export const atRuleNoUnknownSCSS = () =>
  defineRules({
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': atRuleNoUnknownRule(),
  });
