import type { Config } from 'stylelint';
import { atRuleNoUnknownSCSS } from '~/rules/at-rule-no-unknown';
import { dollarVariablePatternSCSS } from '~/rules/dollar-variable-pattern';

export const configScss = (): Config => ({
  extends: ['stylelint-config-standard-scss'],
  rules: {
    ...atRuleNoUnknownSCSS(),
    ...dollarVariablePatternSCSS,
  },
});
