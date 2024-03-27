import { defineRule, defineRules } from '~/utils';

export const declarationBlockNoRedundantLonghandPropertiesRule = defineRule<
  true,
  { ignoreShorthands?: (string | RegExp)[] }
>([true, { ignoreShorthands: ['grid-template'] }]);

export const declarationBlockNoRedundantLonghandProperties = defineRules({
  'declaration-block-no-redundant-longhand-properties':
    declarationBlockNoRedundantLonghandPropertiesRule,
});
