import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('target-cva-compound-variants: bypassing invalid or missing compoundVariants', () => {
  testFormat(
    'ignores config without compoundVariants',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: { size: { sm: 'text-sm' } },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: { size: { sm: 'text-sm' } },
      });
    `,
  );

  testFormat(
    'ignores non-array compoundVariants property',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: 'invalid-string',
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: 'invalid-string',
      });
    `,
  );

  testFormat(
    'skips non-object elements in compoundVariants array',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [null, undefined, 'string-elem'],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [null, undefined, 'string-elem'],
      });
    `,
  );

  testFormat(
    'ignores non-class properties inside compoundVariants objects',
    { classNameThreshold: 1 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            size: 'medium',
          },
        ],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            size: 'medium',
          },
        ],
      });
    `,
  );

  testFormat(
    'skips non-transformable class property values',
    { classNameThreshold: 1 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class: someIdentifier,
          },
        ],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class: someIdentifier,
          },
        ],
      });
    `,
  );
});

describe('target-cva-compound-variants: formatting "class" property', () => {
  testFormat(
    'formats StringLiteral "class" when > threshold',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class:
              'flex items-center justify-center text-sm font-bold bg-white',
          },
        ],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class: [
              'flex items-center justify-center',
              'text-sm font-bold',
              'bg-white',
            ],
          },
        ],
      });
    `,
  );

  testFormat(
    'formats CallExpression in "class"',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class: cn('flex items-center text-sm font-bold bg-white'),
          },
        ],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class: cn('flex items-center', 'text-sm font-bold', 'bg-white'),
          },
        ],
      });
    `,
  );

  testFormat(
    'formats ArrayExpression in "class"',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class: ['flex items-center text-sm font-bold bg-white'],
          },
        ],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            class: ['flex items-center', 'text-sm font-bold', 'bg-white'],
          },
        ],
      });
    `,
  );
});

describe('target-cva-compound-variants: formatting "className" property', () => {
  testFormat(
    'formats StringLiteral "className" when > threshold',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            className:
              'flex items-center justify-center text-sm font-bold bg-white',
          },
        ],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            className: [
              'flex items-center justify-center',
              'text-sm font-bold',
              'bg-white',
            ],
          },
        ],
      });
    `,
  );

  testFormat(
    'leaves StringLiteral "className" unchanged when <= threshold',
    { classNameThreshold: 10 },
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            className: 'flex items-center',
          },
        ],
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        compoundVariants: [
          {
            intent: 'primary',
            className: 'flex items-center',
          },
        ],
      });
    `,
  );
});
