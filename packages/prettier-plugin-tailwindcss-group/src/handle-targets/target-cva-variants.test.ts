import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('target-cva-variants: bypassing invalid or missing variants', () => {
  testFormat(
    'ignores config without variants property',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        defaultVariants: { size: 'sm' },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        defaultVariants: { size: 'sm' },
      });
    `,
  );

  testFormat(
    'ignores non-object variants property',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: 'invalid-string',
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: 'invalid-string',
      });
    `,
  );

  testFormat(
    'skips variant groups that are not objects',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: 'not-an-object',
        },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: 'not-an-object',
        },
      });
    `,
  );

  testFormat(
    'skips options with non-transformable values',
    { classNameThreshold: 1 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: dynamicVar,
          },
        },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: dynamicVar,
          },
        },
      });
    `,
  );
});

describe('target-cva-variants: formatting variant option values', () => {
  testFormat(
    'converts StringLiteral option to StringArrayExpression when > threshold',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: 'flex items-center justify-center text-sm font-bold bg-white shadow-md',
            lg: 'flex',
          },
        },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: [
              'flex items-center justify-center',
              'text-sm font-bold',
              'bg-white',
              'shadow-md',
            ],
            lg: 'flex',
          },
        },
      });
    `,
  );

  testFormat(
    'simplifies variant StringArrayExpression to StringLiteral when <= threshold',
    { classNameThreshold: 10 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: ['flex', 'items-center'],
          },
        },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: 'flex items-center',
          },
        },
      });
    `,
  );

  testFormat(
    'formats CallExpression option in variants',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: cn('flex items-center text-sm font-bold bg-white'),
          },
        },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: cn('flex items-center', 'text-sm font-bold', 'bg-white'),
          },
        },
      });
    `,
  );

  testFormat(
    'preserves dynamic variant option untouched',
    { classNameThreshold: 1 },
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: cn(isActive && 'flex'),
          },
        },
      });
    `,
    dedent /* ts */ `
      const b = cva('base', {
        variants: {
          size: {
            sm: cn(isActive && 'flex'),
          },
        },
      });
    `,
  );
});
