import type { Packages } from '@culur/utils-packages';
import type { Config } from 'stylelint';
import { atRuleNoDeprecated } from '~/rules/at-rule-no-deprecated';
import { atRuleNoUnknownSCSS } from '~/rules/at-rule-no-unknown';
import { dollarVariablePatternSCSS } from '~/rules/dollar-variable-pattern';

export const configScss = (packages: Partial<Packages>): Config => ({
  extends: ['stylelint-config-standard-scss'],
  rules: {
    ...atRuleNoUnknownSCSS(packages),
    ...atRuleNoDeprecated(packages), // override this rule in `stylelint-config-standard-scss`
    ...dollarVariablePatternSCSS,
  },
});
