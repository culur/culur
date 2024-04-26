import { assert, expect } from 'vitest';
import { css, testRuleLintAndFix, testRuleSetting } from '~/__tests__';
import {
  declarationBlockNoRedundantLonghandPropertiesRule,
  declarationBlockNoRedundantLonghandProperties,
} from './declaration-block-no-redundant-longhand-properties';

testRuleSetting(
  declarationBlockNoRedundantLonghandPropertiesRule, //
  rule => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignoreShorthands).toHaveLength(1);
  },
);

testRuleLintAndFix(
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
