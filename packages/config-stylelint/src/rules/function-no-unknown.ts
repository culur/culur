import { hasSass, hasTailwind, hasVue } from '@culur/utils-packages';
import { defineRule, defineRules } from '~/utils';

export function functionNoUnknownRule() {
  const ignoreFunctions = [
    // https://tailwindcss.com/docs/functions-and-directives#functions
    ...(hasTailwind() //
      ? ['theme', 'screen']
      : []),

    // https://sass-lang.com/documentation/modules/list
    // https://sass-lang.com/documentation/modules/math
    // https://sass-lang.com/documentation/modules/color
    ...(hasSass() //
      ? [/^(list|math|color)\..+/]
      : []),

    // https://vuejs.org/api/sfc-css-features.html#v-bind-in-css
    ...(hasVue() //
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

export const functionNoUnknown = () =>
  defineRules({
    'function-no-unknown': functionNoUnknownRule(),
  });
