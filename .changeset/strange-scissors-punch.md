---
'@culur/config-stylelint': minor
---

- Update `order/order` by groups:
  - Import: @use, @forward, @import
  - Root: @config, @tailwind, @layer
  - Variables: $variable, @variable, --property
  - Functions: @function, @mixin
  - Declarations: @extend, @include, @apply, .mixin(), display: block
  - Block rules: &::after {}, child-component {}
  - Blocks nested: @at-root, @responsive, @variants, @screen, @media
- Disable `declaration-empty-line-before`
