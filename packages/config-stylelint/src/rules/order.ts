import { hasSass, hasTailwind } from '@culur/utils-packages';
import { defineRule, defineRules } from '~/utils';

// https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md#options

type Keyword =
  | 'custom-properties' /**/ // Custom properties (e.g. --property: 10px;)
  | 'dollar-variables' /***/ // Dollar variables (e.g. $variable)
  | 'at-variables' /*******/ // At-variables (e.g. @variable available in Less syntax)
  | 'declarations' /*******/ // CSS declarations (e.g. display: block)
  | 'rules' /**************/ // Nested rules (e.g. a { span {} })
  | 'at-rules' /***********/ // Nested at-rules (e.g. div { @media () {} })
  | 'less-mixins'; /*******/ // Mixins in Less syntax (e.g. .mixin();)

type AtRule = {
  type: 'at-rule';
  name?: string;
  parameter?: string | RegExp;
  hasBlock?: boolean;
};

type Rule = {
  type: 'rule';
  selector?: string | RegExp;
  name?: string;
};

type PrimaryOption = Array<Keyword | AtRule | Rule>;
type SecondaryOptions = {
  unspecified?: 'top' | 'bottom' | 'ignore';
};

/**
 * https://sass-lang.com/documentation/at-rules
 */
const atRuleScssImport: PrimaryOption = [
  { type: 'at-rule', name: 'use' },
  { type: 'at-rule', name: 'forward' },
  { type: 'at-rule', name: 'import' },
];
const atRuleScss: PrimaryOption = [
  { type: 'at-rule', name: 'function' },
  { type: 'at-rule', name: 'mixin' },
  { type: 'at-rule', name: 'extend' },
  { type: 'at-rule', name: 'include' },
  { type: 'at-rule', name: 'at-root' },
];

const variables: PrimaryOption = [
  'dollar-variables', // $variable
  'at-variables', // @variable
  'custom-properties', // --property: 10px
];

/**
 * https://tailwindcss.com/docs/functions-and-directives
 */
const atRuleTailwind: PrimaryOption = [
  { type: 'at-rule', name: 'tailwind' },
  { type: 'at-rule', name: 'layer' },
  { type: 'at-rule', name: 'apply' },
  { type: 'at-rule', name: 'config' },
];

/**
 * https://v2.tailwindcss.com/docs/functions-and-directives
 *
 * backwards compatible for v2
 */
const atRuleTailwindV2: PrimaryOption = [
  { type: 'at-rule', name: 'variants' },
  { type: 'at-rule', name: 'responsive' },
  { type: 'at-rule', name: 'screen' },
];

/**
 * Nested rules (e.g. a { span {} })
 */
const rules: PrimaryOption = [
  {
    type: 'rule',
    selector: /^&::[\w-]+/,
  },
  'rules',
];

export const orderRule = () => {
  return defineRule<PrimaryOption, SecondaryOptions>([
    [
      ...(hasSass() ? atRuleScssImport : []),
      ...(hasTailwind() ? atRuleTailwind : []),
      ...variables,
      ...(hasSass() ? atRuleScss : []),
      ...(hasTailwind() ? atRuleTailwindV2 : []),
      'at-rules',
      'less-mixins',
      'declarations',
      ...rules,
    ],
    {
      unspecified: 'bottom',
    },
  ]);
};

export const order = () =>
  defineRules({
    'order/order': orderRule(),
  });
