import type { Packages } from '@culur/utils-packages';
import type { Config } from 'stylelint';
import { atRuleNoDeprecated } from '~/rules/at-rule-no-deprecated';

export const configVue = (packages: Partial<Packages>): Config => ({
  extends: [
    packages.sass
      ? 'stylelint-config-standard-vue/scss'
      : 'stylelint-config-standard-vue',
  ],
  rules: {
    ...atRuleNoDeprecated(packages), // override this rule in `stylelint-config-standard-vue/scss` & `stylelint-config-standard-vue`
  },
});
