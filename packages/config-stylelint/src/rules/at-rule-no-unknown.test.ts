import { assert, expect } from 'vitest';
import { describeLintAndFix, describeRule, syntaxScss } from '~/__tests__';
import {
  atRuleNoUnknownCSS,
  atRuleNoUnknownRule,
  atRuleNoUnknownSCSS,
} from './at-rule-no-unknown';

describeRule(
  atRuleNoUnknownRule,
  [
    { tailwind: false, length: 0 },
    { tailwind: true, length: 7 },
  ],
  (rule, testCase) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreAtRules).toHaveLength(testCase.length);
  },
);

describeLintAndFix(
  o => ({ rules: atRuleNoUnknownCSS(o) }),
  [
    { tailwind: false, code: '@unknown {}', isError: true },
    { tailwind: false, code: '@media {}', isError: false },
    { tailwind: true, code: '@tailwind {}', isError: false },
  ],
);

describeLintAndFix(
  o => ({
    plugins: ['stylelint-scss'],
    rules: atRuleNoUnknownSCSS(o),
    overrides: [syntaxScss],
  }),
  [
    { ext: 'scss', tailwind: false, code: '@unknown {}', isError: true },
    { ext: 'scss', tailwind: false, code: '@media {}', isError: false },
    { ext: 'scss', tailwind: true, code: '@tailwind {}', isError: false },
  ],
);
