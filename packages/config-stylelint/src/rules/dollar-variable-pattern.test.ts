import { assert, expectTypeOf } from 'vitest';
import * as utilsPackages from '@culur/utils-packages';
import {
  dollarVariablePatternRule,
  dollarVariablePatternSCSS,
} from './dollar-variable-pattern';
import { describeLintAndFix, describeRule, scss } from '~/__tests__';

describeRule(utilsPackages, dollarVariablePatternRule, rule => {
  assert(Array.isArray(rule));
  assert(typeof rule[1] === 'object');
  expectTypeOf(rule[1].message).toBeString();
});

describeLintAndFix(
  utilsPackages,
  {
    extends: ['stylelint-config-standard-scss'],
    rules: dollarVariablePatternSCSS,
  },
  [
    { isError: false, code: scss`a { $kebab-case: 123; }` },
    { isError: true, code: scss`a { $snake_case: 123; }` },
    { isError: true, code: scss`a { $camelCase: 123; }` },
  ],
);
