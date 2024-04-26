import type { Config } from 'stylelint';
import { atRuleNoUnknownSCSS } from '~/rules/at-rule-no-unknown';

export const configScss: Config = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    ...atRuleNoUnknownSCSS(),

    'scss/dollar-variable-pattern': [
      '^(-{0,2}?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      { message: 'Expected variable to be kebab-case' },
    ],
  },
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['*.sass', '**/*.sass'],
      customSyntax: 'postcss-sass',
    },
  ],
};
