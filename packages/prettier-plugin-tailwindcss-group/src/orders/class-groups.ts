/**
 * Groups Tailwind CSS classGroupIds into 14 primary categories (+ 1 unknown group) for the plugin.
 * Each category contains a list of corresponding groupIds from tailwind-merge.
 */
export const classGroups: readonly (readonly string[])[] = [
  //! Context & Container
  // prettier-multiline-arrays-next-line-pattern: 4
  [
    'group', 'peer', 'container-type', 'container-named',
  ],

  //! Positioning
  // prettier-multiline-arrays-next-line-pattern: 1 7 4 3
  [
    'position', // position
    'inset', 'inset-x', 'inset-y', 'start', 'end', 'inset-bs', 'inset-be', // inset
    'top', 'right', 'bottom', 'left', // top, right, bottom, left
    'float', 'clear', 'z', // float, clear, z-index
  ],

  //! Display, Flex, Grid
  // prettier-multiline-arrays-next-line-pattern: 4 7 4 4 3 3 3 3 3 1
  [
    'display', 'sr', 'isolation', 'visibility', // display & visibility
    'flex-direction', 'flex-wrap', 'flex', 'grow', 'shrink', 'basis', 'order', // flex
    'grid-cols', 'col-start-end', 'col-start', 'col-end', // grid column
    'grid-rows', 'row-start-end', 'row-start', 'row-end', // grid row
    'grid-flow', 'auto-cols', 'auto-rows', // grid flow
    'gap', 'gap-x', 'gap-y', // gap
    'justify-content', 'justify-items', 'justify-self', // justify
    'align-content', 'align-items', 'align-self', // align
    'place-content', 'place-items', 'place-self', // place
    'columns', // columns
  ],

  //! Box Model & Spacing
  // prettier-multiline-arrays-next-line-pattern: 8 3 3 1 1 3 11 11 4
  [
    'w', 'min-w', 'max-w', 'h', 'min-h', 'max-h', 'size', 'aspect', // size
    'inline-size', 'min-inline-size', 'max-inline-size', // inline-size
    'block-size', 'min-block-size', 'max-block-size', // block-size
    'box', // box-sizing
    'container', // container
    'break-after', 'break-before', 'break-inside', // break
    'p', 'px', 'py', 'ps', 'pe', 'pbs', 'pbe', 'pt', 'pr', 'pb', 'pl', // padding
    'm', 'mx', 'my', 'ms', 'me', 'mbs', 'mbe', 'mt', 'mr', 'mb', 'ml', // margin
    'space-x', 'space-x-reverse', 'space-y', 'space-y-reverse', // space
  ],

  //! Overflow & Scroll
  // prettier-multiline-arrays-next-line-pattern: 6 1 4 11 11
  [
    'overflow', 'overflow-x', 'overflow-y', 'overscroll', 'overscroll-x', 'overscroll-y', // overflow
    'scroll-behavior', // scroll-behavior
    'scrollbar-thumb-color', 'scrollbar-track-color', 'scrollbar-gutter', 'scrollbar-w', // scrollbar
    'scroll-m', 'scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mbs', 'scroll-mbe', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml', // scroll margin
    'scroll-p', 'scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pbs', 'scroll-pbe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl', // scroll padding
  ],

  //! Typography
  // prettier-multiline-arrays-next-line-pattern: 7 6 3 2 2 5 7 3 2 2 1
  [
    'font-size', 'font-smoothing', 'font-style', 'font-weight', 'font-stretch', 'font-family', 'font-features', // font
    'fvn-normal', 'fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction', // font-variant-numeric
    'list-image', 'list-style-position', 'list-style-type', // list
    'placeholder-color', 'text-color', // color
    'text-shadow', 'text-shadow-color', // text-shadow
    'text-decoration', 'text-decoration-style', 'text-decoration-thickness', 'text-decoration-color', 'underline-offset', // underline
    'line-clamp', 'text-overflow', 'text-wrap', 'whitespace', 'break', 'wrap', 'hyphens', // text wrap
    'tracking', 'leading', 'text-transform', // transform
    'indent', 'tab-size', // indent
    'vertical-align', 'text-alignment', // align
    'content', // content
  ],

  //! Background
  // prettier-multiline-arrays-next-line-pattern: 8 6 1 2
  [
    'bg-attachment', 'bg-clip', 'bg-origin', 'bg-position', 'bg-repeat', 'bg-size', 'bg-image', 'bg-color', // background
    'gradient-from-pos', 'gradient-via-pos', 'gradient-to-pos', 'gradient-from', 'gradient-via', 'gradient-to', // gradient
    'box-decoration', // box-decoration
    'object-fit', 'object-position', // object (image)
  ],

  //! Filter
  // prettier-multiline-arrays-next-line-pattern: 11 10
  [
    'filter', 'blur', 'brightness', 'contrast', 'drop-shadow', 'drop-shadow-color', 'grayscale', 'hue-rotate', 'invert', 'saturate', 'sepia', // filter
    'backdrop-filter', 'backdrop-blur', 'backdrop-brightness', 'backdrop-contrast', 'backdrop-grayscale', 'backdrop-hue-rotate', 'backdrop-invert', 'backdrop-opacity', 'backdrop-saturate', 'backdrop-sepia', // backdrop-filter
  ],

  //! Border & Shadow
  // prettier-multiline-arrays-next-line-pattern: 3 4 4 1 3 4 4 4 2 3 4 4 4 4 2 2 5 2 2
  [
    'border-w', 'border-w-x', 'border-w-y', // border width
    'border-w-s', 'border-w-e', 'border-w-bs', 'border-w-be',
    'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l',

    'border-style',
    'border-color', 'border-color-x', 'border-color-y', // border color
    'border-color-s', 'border-color-e', 'border-color-bs', 'border-color-be',
    'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l',

    'divide-x', 'divide-x-reverse', 'divide-y', 'divide-y-reverse', // divide
    'divide-style', 'divide-color', // divide style & divide color

    'rounded', 'rounded-s', 'rounded-e', // rounded
    'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l',
    'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es',
    'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl',

    'outline-style', 'outline-offset', 'outline-w', 'outline-color', // outline

    'shadow', 'shadow-color', // shadow
    'inset-shadow', 'inset-shadow-color', // inset-shadow
    'ring-w', 'ring-w-inset', 'ring-color', 'ring-offset-w', 'ring-offset-color', // ring
    'inset-ring-w', 'inset-ring-color', // inset-ring
  ],

  //! Effect & Mask
  // prettier-multiline-arrays-next-line-pattern: 3 2 5 4 4 4 4 4 4 5 3 5 7
  [
    'opacity', 'mix-blend', 'bg-blend',
    'mask-clip', 'mask-composite',
    'mask-image-linear-pos', 'mask-image-linear-from-pos', 'mask-image-linear-to-pos', 'mask-image-linear-from-color', 'mask-image-linear-to-color', // mask-image-linear
    'mask-image-t-from-pos', 'mask-image-t-to-pos', 'mask-image-t-from-color', 'mask-image-t-to-color', // mask-image-t
    'mask-image-r-from-pos', 'mask-image-r-to-pos', 'mask-image-r-from-color', 'mask-image-r-to-color', // mask-image-r
    'mask-image-b-from-pos', 'mask-image-b-to-pos', 'mask-image-b-from-color', 'mask-image-b-to-color', // mask-image-b
    'mask-image-l-from-pos', 'mask-image-l-to-pos', 'mask-image-l-from-color', 'mask-image-l-to-color', // mask-image-l
    'mask-image-x-from-pos', 'mask-image-x-to-pos', 'mask-image-x-from-color', 'mask-image-x-to-color', // mask-image-x
    'mask-image-y-from-pos', 'mask-image-y-to-pos', 'mask-image-y-from-color', 'mask-image-y-to-color', // mask-image-y

    'mask-image-radial', 'mask-image-radial-from-pos', 'mask-image-radial-to-pos', 'mask-image-radial-from-color', 'mask-image-radial-to-color', // mask-image-radial
    'mask-image-radial-shape', 'mask-image-radial-size', 'mask-image-radial-pos', // mask-image-radial
    'mask-image-conic-pos', 'mask-image-conic-from-pos', 'mask-image-conic-to-pos', 'mask-image-conic-from-color', 'mask-image-conic-to-color', // mask-image-conic
    'mask-mode', 'mask-origin', 'mask-position', 'mask-repeat', 'mask-size', 'mask-type', 'mask-image', // mask others
  ],

  //! Table
  // prettier-multiline-arrays-next-line-pattern: 6
  [
    'border-collapse', 'border-spacing', 'border-spacing-x', 'border-spacing-y', 'table-layout', 'caption',
  ],

  //! Transition & Transform
  // prettier-multiline-arrays-next-line-pattern: 5 4 4 5 3 8 1
  [
    'transition', 'transition-behavior', 'duration', 'ease', 'delay', // transition & animation
    'animate', 'backface', 'perspective', 'perspective-origin', // transforms
    'rotate', 'rotate-x', 'rotate-y', 'rotate-z', // rotate
    'scale', 'scale-x', 'scale-y', 'scale-z', 'scale-3d', // scale
    'skew', 'skew-x', 'skew-y', // skew
    'transform', 'transform-origin', 'transform-style', 'translate', 'translate-x', 'translate-y', 'translate-z', 'translate-none', // transform
    'zoom', // zoom
  ],

  //! Interactivity
  // prettier-multiline-arrays-next-line-pattern: 4 3 2 4 4 2
  [
    'accent', 'forced-color-adjust', 'appearance', 'color-scheme',
    'caret-color', 'cursor', 'pointer-events', // caret & cursor
    'field-sizing', 'resize', // resize
    'snap-align', 'snap-stop', 'snap-type', 'snap-strictness', // snap
    'touch', 'touch-x', 'touch-y', 'touch-pz', // touch
    'select', 'will-change', //
  ],

  //! SVG
  // prettier-multiline-arrays-next-line-pattern: 3
  [
    'fill', 'stroke-w', 'stroke',
  ],
];

/**
 * Total class group count (14 standard groups + 1 Unknown/Custom group at the end).
 */
export const classGroupsCount = classGroups.length + 1;
