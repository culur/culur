import { assert, expect } from 'vitest';
import { scss, testLintAndFix, testRuleValue } from '~/__tests__';

testRuleValue(
  [
    { hasTailwind: false, hasSass: false, length: 8 },
    { hasTailwind: true, hasSass: false, length: 15 },
    { hasTailwind: false, hasSass: true, length: 16 },
    { hasTailwind: true, hasSass: true, length: 23 },
  ],
  async () => {
    const module = await import('./order');
    return module.orderRule();
  },
  (rule, options) => {
    assert(Array.isArray(rule));

    assert(Array.isArray(rule[0]));
    expect(rule[0]).toHaveLength(options.length);

    assert(typeof rule[1] === 'object');
    expect(rule[1]).toStrictEqual({ unspecified: 'bottom' });
  },
);

testLintAndFix(async () => {
  const module = await import('./order');
  return {
    plugins: ['stylelint-order'],
    rules: module.order(),
  };
}, [
  {
    hasTailwind: false,
    hasSass: false,
    code: scss`
      a {
        $variable: 1px;
        --property: 3px;
        @variable: 2px;
        width: 4px;
      }
    `,
    isError: false,
  },
]);
