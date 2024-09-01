import type { Packages } from '@culur/utils-packages';
import { defineRule, defineRules } from '~/utils';

export function functionNoUnknownRule(packages: Partial<Packages>) {
  const ignoreFunctions = [
    // https://tailwindcss.com/docs/functions-and-directives#functions
    ...(packages.tailwind //
      ? ['theme', 'screen']
      : []),

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

  return defineRule<boolean, { ignoreFunctions: (string | RegExp)[] }>([
    true,
    ignoreFunctions.length > 0 //
      ? { ignoreFunctions }
      : { ignoreFunctions: [] },
  ]);
}

export const functionNoUnknown = (packages: Partial<Packages>) =>
  defineRules({
    'function-no-unknown': functionNoUnknownRule(packages),
  });
