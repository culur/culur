import { defineRule, defineRules } from '~/utils';

type PrimaryOption = string;
interface SecondaryOptions {
  message: string;
}

export const dollarVariablePatternRule = defineRule<
  PrimaryOption,
  SecondaryOptions
>([
  '^(-{0,2}?[a-z][a-z0-9]*)(-[a-z0-9]+)*$',
  { message: 'Expected variable to be kebab-case' },
]);

export const dollarVariablePatternSCSS = defineRules({
  'scss/dollar-variable-pattern': dollarVariablePatternRule,
});
