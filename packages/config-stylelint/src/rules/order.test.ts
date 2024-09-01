import { assert, expect } from 'vitest';
import { order, orderRule } from './order';
import { describeLintAndFix, describeRule, scss } from '~/__tests__';

describeRule(
  orderRule,
  [
    { tailwind: false, sass: false, length: 8 },
    { tailwind: true, sass: false, length: 15 },
    { tailwind: false, sass: true, length: 16 },
    { tailwind: true, sass: true, length: 23 },
  ],
  (rule, testCase) => {
    assert(Array.isArray(rule));

    assert(Array.isArray(rule[0]));
    expect(rule[0]).toHaveLength(testCase.length);

    assert(typeof rule[1] === 'object');
    expect(rule[1]).toStrictEqual({ unspecified: 'bottom' });
  },
);

describeLintAndFix(
  o => ({
    plugins: ['stylelint-order'],
    rules: order(o),
  }),
  [
    {
      tailwind: false,
      sass: false,
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
  ],
);
