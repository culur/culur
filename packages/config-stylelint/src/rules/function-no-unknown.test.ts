import { assert, expect } from 'vitest';
import { testLintAndFix, testRuleValue } from '~/__tests__';

testRuleValue(
  [
    { hasTailwind: true, hasSass: false, hasVue: false, length: 2 },
    { hasTailwind: false, hasSass: true, hasVue: false, length: 1 },
    { hasTailwind: false, hasSass: false, hasVue: true, length: 1 },
  ],
  async () => {
    const module = await import('./function-no-unknown');
    return module.functionNoUnknownRule();
  },
  (rule, options) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreFunctions).toHaveLength(options.length);
  },
);

testLintAndFix(async () => {
  const module = await import('./function-no-unknown');
  return { rules: module.functionNoUnknown() };
}, [
  {
    isError: true,
    code: 'a { color: unknown(1); }',
  },
  {
    hasTailwind: true,
    isError: false,
    code: 'a { color: theme(colors.blue.500); }',
  },
  {
    hasVue: true,
    isError: false,
    code: 'a { color: v-bind(colors); }',
  },
]);
