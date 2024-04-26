import { defineRule, defineRules } from '~/utils';

export const functionNoUnknownRule = defineRule<
  boolean,
  { ignoreFunctions: (string | RegExp)[] }
>([
  true,
  {
    ignoreFunctions: [
      // https://sass-lang.com/documentation/modules/list
      // https://sass-lang.com/documentation/modules/math
      // https://sass-lang.com/documentation/modules/color
      /^(list|math|color)\..+/,
      'adjust',

      // https://tailwindcss.com/docs/functions-and-directives#functions
      'theme',
      'screen',

      // https://vuejs.org/api/sfc-css-features.html#v-bind-in-css
      'v-bind',
    ],
  },
]);

export const functionNoUnknown = defineRules({
  'function-no-unknown': functionNoUnknownRule,
});
