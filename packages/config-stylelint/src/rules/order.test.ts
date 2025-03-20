import { assert, expect } from 'vitest';
import { describeLintAndFix, describeRule, scss } from '~/__tests__';
import { order, orderRule } from './order';

describeRule(
  orderRule,
  [
    { sass: false, length: 9 },
    { sass: true, length: 17 },

    { tailwind: 0, length: 14 },
    { tailwind: 1, length: 15 },
    { tailwind: 2, length: 15 },
    { tailwind: 3, length: 13 },
    { tailwind: 4, length: 19 },

    { tailwind: 0, sass: true, length: 22 },
    { tailwind: 1, sass: true, length: 23 },
    { tailwind: 2, sass: true, length: 23 },
    { tailwind: 3, sass: true, length: 21 },
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
