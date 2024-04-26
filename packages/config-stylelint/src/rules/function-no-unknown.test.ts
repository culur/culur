import { testRuleLintAndFix, testRuleSetting } from '~/__tests__';
import { assert, expect } from 'vitest';
import { functionNoUnknownRule } from './function-no-unknown';

testRuleSetting(
  [{}], //
  functionNoUnknownRule,
  rule => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreFunctions).toHaveLength(5);
  },
);

testRuleLintAndFix(
  { rules: { 'function-no-unknown': functionNoUnknownRule } }, //
  [
    { isError: true, code: 'a { color: unknown(1); }' },
    { isError: false, code: 'a { color: theme(colors.blue.500); }' },
    { isError: false, code: 'a { color: v-bind(colors); }' },
  ],
);
