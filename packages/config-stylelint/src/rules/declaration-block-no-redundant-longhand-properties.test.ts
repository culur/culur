import * as utilsPackages from '@culur/utils-packages';
import { assert, expect } from 'vitest';
import {
  declarationBlockNoRedundantLonghandProperties,
  declarationBlockNoRedundantLonghandPropertiesRule,
} from './declaration-block-no-redundant-longhand-properties';
import { css, describeLintAndFix, describeRule } from '~/__tests__';

describeRule(
  utilsPackages,
  declarationBlockNoRedundantLonghandPropertiesRule,
  rule => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreShorthands).toHaveLength(1);
  },
);

describeLintAndFix(
  utilsPackages,
  {
    rules: declarationBlockNoRedundantLonghandProperties,
  },
  [
    {
      code: css`
        a {
          margin-top: 1px;
          margin-right: 2px;
          margin-bottom: 3px;
          margin-left: 4px;
        }
      `,
      fixedCode: css`
        a {
          margin: 1px 2px 3px 4px;
        }
      `,
    },
  ],
);
