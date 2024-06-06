import { assert, expect } from 'vitest';
import * as utilsPackages from '@culur/utils-packages';
import {
  functionNoUnknown,
  functionNoUnknownRule,
} from './function-no-unknown';
import { describeLintAndFix, describeRule } from '~/__tests__';

describeRule(
  utilsPackages,
  functionNoUnknownRule,
  [
    { hasTailwind: true, hasSass: false, hasVue: false, length: 2 },
    { hasTailwind: false, hasSass: true, hasVue: false, length: 1 },
    { hasTailwind: false, hasSass: false, hasVue: true, length: 1 },
  ],
  (rule, options) => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreFunctions).toHaveLength(options.length);
  },
);

describeLintAndFix(
  utilsPackages, //
  () => ({ rules: functionNoUnknown() }),
  [
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
  ],
);
