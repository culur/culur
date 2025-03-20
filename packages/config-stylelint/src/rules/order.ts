import type { Packages } from '@culur/utils-packages';
import { defineRule, defineRules, isInRange } from '~/utils';

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

const definePrimaryOption = (...options: (PrimaryOption[number] | false | undefined)[]) =>
  options.filter((option): option is PrimaryOption[number] => !!option);

export const orderRule = (packages: Partial<Packages>) =>
  defineRule<PrimaryOption, SecondaryOptions>([
    definePrimaryOption(
      //! import
      packages.sass /**********************************/ && { type: 'at-rule', name: 'use' }, //            scss:               @use 'path/path';
      packages.sass /**********************************/ && { type: 'at-rule', name: 'forward' }, //        scss:               @forward 'path/path';
      packages.sass /**********************************/ && { type: 'at-rule', name: 'import' }, //         scss:               @import 'path/path';
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'import' }, //         tailwind         4: @import "tailwindcss";
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'source' }, //         tailwind         4: @source "../node_modules/@culur/ui-lib";
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'reference' }, //      tailwind         4: @reference "../../app.css";

      //! root
      isInRange(packages.tailwind, [0, 1, 2, 3]) /*****/ && { type: 'at-rule', name: 'tailwind' }, //       tailwind 0,1,2,3  : @tailwind base;
      isInRange(packages.tailwind, [3, 4]) /***********/ && { type: 'at-rule', name: 'config' }, //         tailwind       3,4: @config 'tailwind.custom.config.js'
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'plugin' }, //         tailwind         4: @plugin '@tailwindcss/typography'
      isInRange(packages.tailwind, [1, 2, 3]) /********/ && { type: 'at-rule', name: 'layer' }, //          tailwind   1,2,3  : @layer base {}

      //! variables
      'dollar-variables', //                                                                                css:                $variable: 10px;
      'at-variables', //                                                                                    css:                @variable: 10px;
      { type: 'at-rule', hasBlock: false }, //                                                              css:                @variable: 10px;
      'custom-properties', //                                                                               css:                --property: 10px;

      //! tailwind
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'theme' }, //          tailwind         4: @theme {}
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'custom-variant' }, // tailwind         4: @custom-variant pointer-coarse (@media (pointer: coarse));

      //! functions, methods
      packages.sass /**********************************/ && { type: 'at-rule', name: 'function' }, //       scss:               @function sum() {}
      packages.sass /**********************************/ && { type: 'at-rule', name: 'mixin' }, //          scss:               @mixin mixin-name {}
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'utility' }, //        tailwind         4: @utility tab-4 { tab-size: 4; }

      //! declarations
      packages.sass /**********************************/ && { type: 'at-rule', name: 'extend' }, //         scss:               @extend .class-name;
      packages.sass /**********************************/ && { type: 'at-rule', name: 'include' }, //        scss:               @include mixin-name;
      isInRange(packages.tailwind, [0, 1, 2, 3, 4]) /**/ && { type: 'at-rule', name: 'apply' }, //          tailwind 0,1,2,3,4: @apply p-3;
      'less-mixins', //                                                                                     less:               .mixin();
      'declarations', //                                                                                    css:                display: block;

      //! block rules
      { type: 'rule', selector: /^&::[\w-]+/ }, //                                                          css:                &::after {}
      'rules', //                                                                                           css:                child-component {}

      //! blocks nested
      packages.sass && { type: 'at-rule', name: 'at-root' }, //                                             scss:               @at-root selector { /* content */ }
      isInRange(packages.tailwind, [0, 1, 2]) /********/ && { type: 'at-rule', name: 'responsive' }, //     tailwind 0,1,2    : @responsive {}
      isInRange(packages.tailwind, [0, 1, 2]) /********/ && { type: 'at-rule', name: 'variants' }, //       tailwind 0,1,2    : @variants hover {}
      isInRange(packages.tailwind, [0, 1, 2]) /********/ && { type: 'at-rule', name: 'screen' }, //         tailwind 0,1,2    : @screen sm {}
      isInRange(packages.tailwind, [4]) /**************/ && { type: 'at-rule', name: 'variants' }, //       tailwind         4: @variant dark {}
      { type: 'at-rule', hasBlock: true }, //                                                               css:                @media () {}
    ),
    {
      unspecified: 'bottom',
    },
  ]);

export const order = (packages: Partial<Packages>) =>
  defineRules({
    'order/order': orderRule(packages),
  });
