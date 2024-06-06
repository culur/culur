import * as utilsPackages from '@culur/utils-packages';
import { assert, expect } from 'vitest';
import { order, orderRule } from './order';
import { describeLintAndFix, describeRule, scss } from '~/__tests__';

describeRule(
  utilsPackages,
  orderRule,
  [
    { hasTailwind: false, hasSass: false, length: 8 },
    { hasTailwind: true, hasSass: false, length: 15 },
    { hasTailwind: false, hasSass: true, length: 16 },
    { hasTailwind: true, hasSass: true, length: 23 },
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
  utilsPackages,
  async () => ({
    plugins: ['stylelint-order'],
    rules: order(),
  }),
  [
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
  ],
);
