import type { Packages } from '@culur/utils-packages';
import type { Config } from 'stylelint';
import { atRuleNoDeprecated } from '~/rules/at-rule-no-deprecated';
import { atRuleNoUnknownCSS } from '~/rules/at-rule-no-unknown';
import { declarationBlockNoRedundantLonghandProperties } from '~/rules/declaration-block-no-redundant-longhand-properties';
import { functionNoUnknown } from '~/rules/function-no-unknown';
import { importNotationCSS } from '~/rules/import-notation';
import { order } from '~/rules/order';
import { selectorPseudoClassNoUnknown } from '~/rules/selector-pseudo-class-no-unknown';

export const configCss = (packages: Partial<Packages>): Config => ({
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  plugins: ['stylelint-order', 'stylelint-selector-bem-pattern'],
  rules: {
    ...atRuleNoDeprecated(packages), // override this rule in `stylelint-config-standard`
    ...atRuleNoUnknownCSS(packages),
    ...declarationBlockNoRedundantLonghandProperties,
    ...functionNoUnknown(packages),
    ...importNotationCSS(packages),
    ...order(packages),
    ...selectorPseudoClassNoUnknown,
    'declaration-empty-line-before': null,
  },
});
