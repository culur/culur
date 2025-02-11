import { assert, expect } from 'vitest';
import { describeLintAndFix, describeRule } from '~/__tests__';
import {
  atRuleNoDeprecated,
  atRuleNoDeprecatedRule,
} from './at-rule-no-deprecated';

describeRule(
  atRuleNoDeprecatedRule,
  [
    { tailwind: false, length: 0 },
    { tailwind: true, length: 1 },
  ],
  (rule, testCase) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreAtRules).toHaveLength(testCase.length);
  },
);

describeLintAndFix(
  o => ({ rules: atRuleNoDeprecated(o) }),
  [
    { tailwind: false, code: '@apply {}', isError: true },
    { tailwind: true, code: '@apply {}', isError: false },
  ],
);
