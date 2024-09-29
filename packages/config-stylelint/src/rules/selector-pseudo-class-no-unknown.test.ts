import { assert, expect } from 'vitest';
import { css, describeLintAndFix, describeRule } from '~/__tests__';
import {
  selectorPseudoClassNoUnknown,
  selectorPseudoClassNoUnknownRule,
} from './selector-pseudo-class-no-unknown';

describeRule(
  selectorPseudoClassNoUnknownRule, //
  rule => {
    assert(Array.isArray(rule));
    assert(typeof rule[1] === 'object');
    expect(rule[1].ignorePseudoClasses).toHaveLength(2);
  },
);

describeLintAndFix(
  { rules: selectorPseudoClassNoUnknown }, //
  [
    {
      code: css`
        :global(.global-class) {
          /* global */
        }
        :local(.local-class) {
          /* local */
        }
      `,
      isError: false,
    },
    {
      code: css`
        :invalid-pseudo(.some-class) {
          /*  */
        }
      `,
      isError: true,
    },
  ],
);
