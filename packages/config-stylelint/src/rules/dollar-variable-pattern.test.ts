import { assert, expectTypeOf } from 'vitest';
import { scss, testLintAndFix, testRuleValue } from '~/__tests__';
import {
  dollarVariablePatternRule,
  dollarVariablePatternSCSS,
} from './dollar-variable-pattern';

testRuleValue(
  () => dollarVariablePatternRule,
  rule => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expectTypeOf(rule[1].message).toBeString();
  },
);

testLintAndFix(
  {
    extends: ['stylelint-config-standard-scss'],
    rules: dollarVariablePatternSCSS,
  }, //
  [
    { isError: false, code: scss`a { $kebab-case: 123; }` },
    { isError: true, code: scss`a { $snake_case: 123; }` },
    { isError: true, code: scss`a { $camelCase: 123; }` },
  ],
);
