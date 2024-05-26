import { assert, expect } from 'vitest';
import {
  declarationBlockNoRedundantLonghandProperties,
  declarationBlockNoRedundantLonghandPropertiesRule,
} from './declaration-block-no-redundant-longhand-properties';
import { css, testLintAndFix, testRuleValue } from '~/__tests__';

testRuleValue(
  declarationBlockNoRedundantLonghandPropertiesRule, //
  rule => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreShorthands).toHaveLength(1);
  },
);

testLintAndFix(
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
