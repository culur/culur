import { assert, expect } from 'vitest';
import { describeLintAndFix, describeRule } from '~/__tests__';
import {
  functionNoUnknown,
  functionNoUnknownRule,
} from './function-no-unknown';

describeRule(
  functionNoUnknownRule,
  [
    { tailwind: 0, sass: false, vue: false, length: 1 },
    { tailwind: 1, sass: false, vue: false, length: 1 },
    { tailwind: 2, sass: false, vue: false, length: 2 },
    { tailwind: 3, sass: false, vue: false, length: 2 },
    { tailwind: 4, sass: false, vue: false, length: 3 },
    { tailwind: false, sass: true, vue: false, length: 1 },
    { tailwind: false, sass: false, vue: true, length: 1 },
  ],
  (rule, options) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreFunctions).toHaveLength(options.length);
  },
);

describeLintAndFix(
  o => ({ rules: functionNoUnknown(o) }),
  [
    {
      isError: true,
      code: 'a { color: unknown(1); }',
    },
    {
      tailwind: 3,
      isError: false,
      code: 'a { color: theme(colors.blue.500); }',
    },
    {
      vue: true,
      isError: false,
      code: 'a { color: v-bind(colors); }',
    },
  ],
);
