import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('target-cva: validation and bypass', () => {
  testFormat(
    'ignores non-cva function calls',
    { classNameThreshold: 2 },
    dedent /* ts */ `
      const b = myOtherFn('flex items-center text-sm font-bold');
    `,
    dedent /* ts */ `
      const b = myOtherFn('flex items-center text-sm font-bold');
    `,
  );

  testFormat(
    'ignores aliased/renamed cva calls (e.g. createVariants or classVarianceAuthority)',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const button = createVariants(
        'flex items-center justify-center text-sm font-bold bg-white shadow-md',
      );
    `,
    dedent /* ts */ `
      const button = createVariants(
        'flex items-center justify-center text-sm font-bold bg-white shadow-md',
      );
    `,
  );

  testFormat(
    'ignores cva() calls with no arguments',
    { classNameThreshold: 2 },
    dedent /* ts */ ` const b = cva(); `,
    dedent /* ts */ ` const b = cva(); `,
  );

  testFormat(
    'handles cva(base, ...spreadConfig) by processing only base',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva(
        'flex items-center justify-center text-sm font-bold bg-white',
        ...spreadConfig,
      );
    `,
    dedent /* ts */ `
      const b = cva(
        ['flex items-center justify-center', 'text-sm font-bold', 'bg-white'],
        ...spreadConfig,
      );
    `,
  );

  testFormat(
    'handles cva(base, identifierConfig) by processing only base',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva(
        'flex items-center justify-center text-sm font-bold bg-white',
        config,
      );
    `,
    dedent /* ts */ `
      const b = cva(
        ['flex items-center justify-center', 'text-sm font-bold', 'bg-white'],
        config,
      );
    `,
  );
});

describe('target-cva: full cva processing (base + config)', () => {
  testFormat(
    'formats both base and variants in a complete cva definition',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva(
        'flex items-center justify-center text-sm font-bold bg-white',
        {
          variants: {
            intent: {
              primary:
                'flex items-center justify-center text-sm font-bold bg-white shadow-md',
            },
          },
          compoundVariants: [
            {
              intent: 'primary',
              class:
                'flex items-center justify-center text-sm font-bold bg-white',
            },
          ],
        },
      );
    `,
    dedent /* ts */ `
      const b = cva(
        ['flex items-center justify-center', 'text-sm font-bold', 'bg-white'],
        {
          variants: {
            intent: {
              primary: [
                'flex items-center justify-center',
                'text-sm font-bold',
                'bg-white',
                'shadow-md',
              ],
            },
          },
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
        },
      );
    `,
  );
});
