import type { Packages } from '@culur/utils-packages';
import type { Config } from 'stylelint';
import { atRuleNoDeprecated } from '~/rules/at-rule-no-deprecated';
import { atRuleNoUnknownCSS } from '~/rules/at-rule-no-unknown';
import { declarationBlockNoRedundantLonghandProperties } from '~/rules/declaration-block-no-redundant-longhand-properties';
import { functionNoUnknown } from '~/rules/function-no-unknown';
import { order } from '~/rules/order';
import { selectorPseudoClassNoUnknown } from '~/rules/selector-pseudo-class-no-unknown';

export const configCss = (packages: Partial<Packages>): Config => ({
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
  rules: {
    ...atRuleNoUnknownCSS(packages),
    ...atRuleNoDeprecated(packages),
    ...declarationBlockNoRedundantLonghandProperties,
    ...functionNoUnknown(packages),
    ...order(packages),
    ...selectorPseudoClassNoUnknown,
    'declaration-empty-line-before': null,
  },
});
