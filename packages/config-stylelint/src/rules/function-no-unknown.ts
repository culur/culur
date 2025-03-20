import type { Packages } from '@culur/utils-packages';
import { defineRule, defineRules } from '~/utils';

const getIgnoreFunctionsByTailwindVersion = (
  tailwindVersion: false | number | undefined,
) => {
  switch (tailwindVersion) {
    // https://tailwindcss-v0.netlify.app//docs/functions-and-directives
    case 0:
      return ['config'];

    // https://v1.tailwindcss.com/docs/functions-and-directives
    case 1:
      return ['theme'];

    // https://v2.tailwindcss.com/docs/functions-and-directives
    case 2:
      return ['screen', 'theme'];

    // https://v3.tailwindcss.com/docs/functions-and-directives
    case 3:
      return ['theme', 'screen'];

    // https://tailwindcss.com/docs/functions-and-directives
    case 4:
      return ['--alpha', '--spacing', 'theme'];

    default:
      return [];
  }
};

const getIgnoreFunctions = (packages: Partial<Packages>) => [
  // https://tailwindcss.com
  ...getIgnoreFunctionsByTailwindVersion(packages.tailwind),

  // https://sass-lang.com/documentation/modules/list
  // https://sass-lang.com/documentation/modules/math
  // https://sass-lang.com/documentation/modules/color
  ...(packages.sass //
    ? [/^(list|math|color)\..+/]
    : []),

  // https://vuejs.org/api/sfc-css-features.html#v-bind-in-css
  ...(packages.vue //
    ? ['v-bind']
    : []),
];

export function functionNoUnknownRule(packages: Partial<Packages>) {
  return defineRule<true, { ignoreFunctions: (string | RegExp)[] }>([
    true,
    { ignoreFunctions: getIgnoreFunctions(packages) },
  ]);
}

export const functionNoUnknown = (packages: Partial<Packages>) =>
  defineRules({
    'function-no-unknown': functionNoUnknownRule(packages),
  });
