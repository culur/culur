import { assert, expect } from 'vitest';
import { syntaxScss, testLintAndFix } from '~/__tests__';
import { testRuleValue } from '~/__tests__/test-rule-or-config-value';

testRuleValue(
  [
    { hasTailwind: false, length: 0 },
    { hasTailwind: true, length: 7 },
  ],
  async () => {
    const module = await import('./at-rule-no-unknown');
    return module.atRuleNoUnknownRule();
  },
  (rule, options) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreAtRules).toHaveLength(options.length);
  },
);

testLintAndFix(async () => {
  const module = await import('./at-rule-no-unknown');
  return {
    rules: module.atRuleNoUnknownCSS(),
  };
}, [
  { hasTailwind: false, code: '@unknown {}', isError: true },
  { hasTailwind: false, code: '@media {}', isError: false },
  { hasTailwind: true, code: '@tailwind {}', isError: false },
]);

testLintAndFix(async () => {
  const module = await import('./at-rule-no-unknown');
  return {
    plugins: ['stylelint-scss'],
    rules: module.atRuleNoUnknownSCSS(),
    overrides: [syntaxScss],
  };
}, [
  { ext: 'scss', hasTailwind: false, code: '@unknown {}', isError: true },
  { ext: 'scss', hasTailwind: false, code: '@media {}', isError: false },
  { ext: 'scss', hasTailwind: true, code: '@tailwind {}', isError: false },
]);
