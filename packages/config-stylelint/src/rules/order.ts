import type { Packages } from '@culur/utils-packages';
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

interface AtRule {
  type: 'at-rule';
  name?: string;
  parameter?: string | RegExp;
  hasBlock?: boolean;
}

interface Rule {
  type: 'rule';
  selector?: string | RegExp;
  name?: string;
}

type PrimaryOption = Array<Keyword | AtRule | Rule>;
interface SecondaryOptions {
  unspecified?: 'top' | 'bottom' | 'ignore';
}

const definePrimaryOption = (
  ...options: (PrimaryOption[number] | false | undefined)[]
) => options.filter((option): option is PrimaryOption[number] => !!option);

export const orderRule = (packages: Partial<Packages>) =>
  defineRule<PrimaryOption, SecondaryOptions>([
    definePrimaryOption(
      //! import
      packages.sass && { type: 'at-rule', name: 'use' }, //            scss:        @use 'path/path';
      packages.sass && { type: 'at-rule', name: 'forward' }, //        scss:        @forward 'path/path';
      packages.sass && { type: 'at-rule', name: 'import' }, //         scss:        @import 'path/path';

      //! root
      packages.tailwind && { type: 'at-rule', name: 'config' }, //     tailwind v3: @config 'tailwind.custom.config.js'
      packages.tailwind && { type: 'at-rule', name: 'tailwind' }, //   tailwind v3: @tailwind base;
      packages.tailwind && { type: 'at-rule', name: 'layer' }, //      tailwind v3: @layer base {}

      //! variables
      'dollar-variables', //                                           css:         $variable: 10px;
      'at-variables', //                                               css:         @variable: 10px;
      { type: 'at-rule', hasBlock: false }, //                         css:         @variable: 10px;
      'custom-properties', //                                          css:         --property: 10px;

      //! functions, methods
      packages.sass && { type: 'at-rule', name: 'function' }, //       scss:        @function sum() {}
      packages.sass && { type: 'at-rule', name: 'mixin' }, //          scss:        @mixin mixin-name {}

      //! declarations
      packages.sass && { type: 'at-rule', name: 'extend' }, //         scss:        @extend .class-name;
      packages.sass && { type: 'at-rule', name: 'include' }, //        scss:        @include mixin-name;
      packages.tailwind && { type: 'at-rule', name: 'apply' }, //      tailwind v3: @apply p-3;
      'less-mixins', //                                                less:        .mixin();
      'declarations', //                                               css:         display: block;

      //! block rules
      { type: 'rule', selector: /^&::[\w-]+/ }, //                     css:         &::after {}
      'rules', //                                                      css:         child-component {}

      //! blocks nested
      packages.sass && { type: 'at-rule', name: 'at-root' }, //        scss:        @at-root selector { /* content */ }
      packages.tailwind && { type: 'at-rule', name: 'responsive' }, // tailwind v2: @responsive {}
      packages.tailwind && { type: 'at-rule', name: 'variants' }, //   tailwind v2: @variants hover {}
      packages.tailwind && { type: 'at-rule', name: 'screen' }, //     tailwind v2: @screen sm {}
      { type: 'at-rule', hasBlock: true }, //                          css:         @media () {}
    ),
    {
      unspecified: 'bottom',
    },
  ]);

export const order = (packages: Partial<Packages>) =>
  defineRules({
    'order/order': orderRule(packages),
  });
