import * as utilsPackages from '@culur/utils-packages';
import { assert, expect } from 'vitest';
import {
  atRuleNoUnknownCSS,
  atRuleNoUnknownRule,
  atRuleNoUnknownSCSS,
} from './at-rule-no-unknown';
import { describeLintAndFix, describeRule, syntaxScss } from '~/__tests__';

describeRule(
  utilsPackages,
  atRuleNoUnknownRule,
  [
    { hasTailwind: false, length: 0 },
    { hasTailwind: true, length: 7 },
  ],
  (rule, testCase) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreAtRules).toHaveLength(testCase.length);
  },
);

describeLintAndFix(
  utilsPackages, //
  () => ({ rules: atRuleNoUnknownCSS() }),
  [
    { hasTailwind: false, code: '@unknown {}', isError: true },
    { hasTailwind: false, code: '@media {}', isError: false },
    { hasTailwind: true, code: '@tailwind {}', isError: false },
  ],
);

describeLintAndFix(
  utilsPackages,
  () => ({
    plugins: ['stylelint-scss'],
    rules: atRuleNoUnknownSCSS(),
    overrides: [syntaxScss],
  }),
  [
    { ext: 'scss', hasTailwind: false, code: '@unknown {}', isError: true },
    { ext: 'scss', hasTailwind: false, code: '@media {}', isError: false },
    { ext: 'scss', hasTailwind: true, code: '@tailwind {}', isError: false },
  ],
);
