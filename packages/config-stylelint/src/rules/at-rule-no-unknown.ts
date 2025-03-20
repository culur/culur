import type { Packages } from '@culur/utils-packages';
import { defineRule, defineRules } from '~/utils';

const getIgnoreAtRulesByTailwindVersion = (
  tailwindVersion: false | number | undefined,
) => {
  switch (tailwindVersion) {
    // https://tailwindcss-v0.netlify.app//docs/functions-and-directives
    case 0:
      return [
        // Directives
        'tailwind',
        'apply',

        'variants',
        'responsive',
        'screen',
      ];

    // https://v1.tailwindcss.com/docs/functions-and-directives
    // https://v2.tailwindcss.com/docs/functions-and-directives
    case 1:
    case 2:
      return [
        // Directives
        'tailwind',
        'apply',
        'layer', // new

        'variants',
        'responsive',
        'screen',
      ];

    // https://v3.tailwindcss.com/docs/functions-and-directives
    case 3:
      return [
        // Directives
        'tailwind',
        'layer',
        'apply',
        'config', // new
      ];

    // https://tailwindcss.com/docs/functions-and-directives
    case 4:
      return [
        // Directives
        'import',
        'theme',
        'source',
        'utility',
        'variant',
        'custom-variant',
        'apply',
        'reference',

        // Compatibility
        'config',
        'plugin',
      ];

    default:
      return [];
  }
};

export const atRuleNoUnknownRule = (packages: Partial<Packages>) =>
  defineRule<true, { ignoreAtRules: (string | RegExp)[] }>([
    true,
    { ignoreAtRules: getIgnoreAtRulesByTailwindVersion(packages.tailwind) },
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
