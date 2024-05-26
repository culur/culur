import type { Config } from 'stylelint';
import { atRuleNoUnknownCSS } from '~/rules/at-rule-no-unknown';
import { declarationBlockNoRedundantLonghandProperties } from '~/rules/declaration-block-no-redundant-longhand-properties';
import { functionNoUnknown } from '~/rules/function-no-unknown';
import { order } from '~/rules/order';

export const configCss = (): Config => ({
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
  rules: {
    ...atRuleNoUnknownCSS(),
    ...declarationBlockNoRedundantLonghandProperties,
    ...functionNoUnknown(),
    ...order(),
  },
});
