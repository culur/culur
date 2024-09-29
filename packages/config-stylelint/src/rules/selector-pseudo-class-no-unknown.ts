import { defineRule, defineRules } from '~/utils';

export const selectorPseudoClassNoUnknownRule = defineRule<
  true,
  { ignorePseudoClasses?: (string | RegExp)[] }
>([true, { ignorePseudoClasses: ['global', 'local'] }]);

export const selectorPseudoClassNoUnknown = defineRules({
  'selector-pseudo-class-no-unknown': selectorPseudoClassNoUnknownRule,
});
