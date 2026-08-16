import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('handle-cva-class-value: case 1: stringLiteral expression', () => {
  testFormat(
    'converts StringLiteral to StringArrayExpression when class count > threshold',
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
    'leaves StringLiteral unchanged when class count <= threshold',
    { classNameThreshold: 5 },
    dedent /* ts */ ` const b = cva('flex items-center text-sm'); `,
    dedent /* ts */ ` const b = cva('flex items-center text-sm'); `,
  );
});

describe('handle-cva-class-value: case 2: callExpression with tailwind function', () => {
  testFormat(
    'simplifies CallExpression to StringLiteral when class count <= threshold',
    { classNameThreshold: 5 },
    dedent /* ts */ ` const b = cva(cn('flex', 'items-center')); `,
    dedent /* ts */ ` const b = cva('flex items-center'); `,
  );

  testFormat(
    'groups CallExpression arguments when class count > threshold',
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
    'supports custom tailwindFunctions option',
    { classNameThreshold: 2, tailwindFunctions: ['clsx'] },
    dedent /* ts */ `
      const b = cva(clsx('flex items-center text-sm font-bold'));
    `,
    dedent /* ts */ `
      const b = cva(clsx('flex items-center', 'text-sm font-bold'));
    `,
  );
});

describe('handle-cva-class-value: case 3: arrayExpression', () => {
  testFormat(
    'simplifies ArrayExpression to StringLiteral when class count <= threshold',
    { classNameThreshold: 10 },
    dedent /* ts */ ` const b = cva(['flex', 'items-center', 'text-sm']); `,
    dedent /* ts */ ` const b = cva('flex items-center text-sm'); `,
  );

  testFormat(
    'flattens and regroups ArrayExpression when class count > threshold',
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
    'preserves dynamic elements within ArrayExpression',
    { classNameThreshold: 1 },
    dedent /* ts */ ` const b = cva([isActive && 'bg-blue-500', 'flex']); `,
    dedent /* ts */ ` const b = cva(['flex', isActive && 'bg-blue-500']); `,
  );

  testFormat(
    'preserves sparse array holes (empty slots) when regrouping',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const b = cva([
        ,
        'flex items-center justify-center text-sm font-bold bg-white',
      ]);
    `,
    dedent /* ts */ `
      const b = cva([
        'flex items-center justify-center',
        'text-sm font-bold',
        'bg-white',
        ,
      ]);
    `,
  );
});

describe('handle-cva-class-value: fallback: unrecognized or other expressions', () => {
  testFormat(
    'ignores CallExpression with callee not in tailwindFunctions',
    { classNameThreshold: 1, tailwindFunctions: ['cn'] },
    dedent /* ts */ ` const b = cva(customHelper('flex items-center')); `,
    dedent /* ts */ ` const b = cva(customHelper('flex items-center')); `,
  );

  testFormat(
    'ignores Identifier class value',
    { classNameThreshold: 1 },
    dedent /* ts */ ` const b = cva(baseStyles); `,
    dedent /* ts */ ` const b = cva(baseStyles); `,
  );
});
