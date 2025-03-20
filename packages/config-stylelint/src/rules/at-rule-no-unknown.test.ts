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
    { tailwind: 0, length: 5 },
    { tailwind: 1, length: 6 },
    { tailwind: 2, length: 6 },
    { tailwind: 3, length: 4 },
    { tailwind: 4, length: 10 },
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
    { tailwind: 3, code: '@tailwind {}', isError: false },
    { tailwind: 4, code: '@tailwind {}', isError: true },
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
    { ext: 'scss', tailwind: 3, code: '@tailwind {}', isError: false },
    { ext: 'scss', tailwind: 4, code: '@tailwind {}', isError: true },
  ],
);
