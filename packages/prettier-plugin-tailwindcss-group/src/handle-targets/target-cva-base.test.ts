import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('target-cva-base: missing or spread base arguments', () => {
  testFormat(
    'ignores cva() without arguments',
    { classNameThreshold: 4 },
    dedent /* ts */ ` const b = cva(); `,
    dedent /* ts */ ` const b = cva(); `,
  );

  testFormat(
    'ignores cva(...args) with SpreadElement base',
    { classNameThreshold: 4 },
    dedent /* ts */ ` const b = cva(...args); `,
    dedent /* ts */ ` const b = cva(...args); `,
  );
});

describe('target-cva-base: stringLiteral base', () => {
  testFormat(
    'converts to StringArrayExpression when class count > threshold',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva(
        'flex items-center justify-center text-sm font-bold bg-white',
      );
    `,
    dedent /* ts */ `
      const b = cva([
        'flex items-center justify-center',
        'text-sm font-bold',
        'bg-white',
      ]);
    `,
  );

  testFormat(
    'stays StringLiteral when class count <= threshold',
    { classNameThreshold: 5 },
    dedent /* ts */ ` const b = cva('flex items-center'); `,
    dedent /* ts */ ` const b = cva('flex items-center'); `,
  );
});

describe('target-cva-base: arrayExpression base', () => {
  testFormat(
    'flattens and regroups when class count > threshold',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva([
        'flex items-center justify-center',
        'text-sm font-bold bg-white',
      ]);
    `,
    dedent /* ts */ `
      const b = cva([
        'flex items-center justify-center',
        'text-sm font-bold',
        'bg-white',
      ]);
    `,
  );

  testFormat(
    'simplifies to StringLiteral when class count <= threshold',
    { classNameThreshold: 10 },
    dedent /* ts */ ` const b = cva(['flex', 'items-center']); `,
    dedent /* ts */ ` const b = cva('flex items-center'); `,
  );

  testFormat(
    'preserves dynamic elements in array base',
    { classNameThreshold: 1 },
    dedent /* ts */ ` const b = cva([isActive && 'bg-blue-500']); `,
    dedent /* ts */ ` const b = cva([isActive && 'bg-blue-500']); `,
  );
});

describe('target-cva-base: callExpression base', () => {
  testFormat(
    'groups arguments when class count > threshold',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva(
        cn('flex items-center justify-center text-sm font-bold bg-white'),
      );
    `,
    dedent /* ts */ `
      const b = cva(
        cn('flex items-center justify-center', 'text-sm font-bold', 'bg-white'),
      );
    `,
  );

  testFormat(
    'simplifies to StringLiteral when class count <= threshold',
    { classNameThreshold: 10 },
    dedent /* ts */ ` const b = cva(cn('flex', 'items-center')); `,
    dedent /* ts */ ` const b = cva('flex items-center'); `,
  );
});
