import { assert, expect } from 'vitest';
import { describeLintAndFix, describeRule, scss } from '~/__tests__';
import { order, orderRule } from './order';

describeRule(
  orderRule,
  [
    { tailwind: false, sass: false, length: 9 },
    { tailwind: true, sass: false, length: 16 },
    { tailwind: false, sass: true, length: 17 },
    { tailwind: true, sass: true, length: 24 },
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
          @variable: 2px;
          --property: 3px;
          width: 4px;
        }
      `,
      isError: false,
    },
  ],
);
