import { assert, expect } from 'vitest';
import { testRuleLintAndFix, testRuleSetting } from '~/__tests__';
import { syntaxScss } from '~/utils';
import {
  atRuleNoUnknownCSS,
  atRuleNoUnknownRule,
  atRuleNoUnknownSCSS,
} from './at-rule-no-unknown';

testRuleSetting(
  [
    { hasTailwind: false, length: 0 },
    { hasTailwind: true, length: 7 },
  ],
  () => atRuleNoUnknownRule(),
  (rule, options) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreAtRules).toHaveLength(options.length);
  },
);

testRuleLintAndFix(
  () => ({
    rules: atRuleNoUnknownCSS(),
  }),
  [
    { hasTailwind: false, code: '@unknown {}', isError: true },
    { hasTailwind: false, code: '@media {}', isError: false },
    { hasTailwind: true, code: '@tailwind {}', isError: false },
  ],
);

testRuleLintAndFix(
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
