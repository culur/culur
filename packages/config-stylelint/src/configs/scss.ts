import type { Packages } from '@culur/utils-packages';
import type { Config } from 'stylelint';
import { atRuleNoUnknownSCSS } from '~/rules/at-rule-no-unknown';
import { dollarVariablePatternSCSS } from '~/rules/dollar-variable-pattern';

export const configScss = (packages: Partial<Packages>): Config => ({
  extends: ['stylelint-config-standard-scss'],
  rules: {
    ...atRuleNoUnknownSCSS(packages),
    ...dollarVariablePatternSCSS,
  },
});
