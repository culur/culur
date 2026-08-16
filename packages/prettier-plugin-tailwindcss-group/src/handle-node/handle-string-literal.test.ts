import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('handle-string-literal: jsx target (target = "jsx")', () => {
  testFormat(
    'leaves StringLiteral unchanged when class count <= threshold',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className="btn primary active" />; `,
    dedent /* tsx */ ` <div className="btn primary active" />; `,
  );

  testFormat(
    'wraps in JSXExpressionContainer with helper function call when > threshold',
    { classNameThreshold: 4 },
    dedent /* tsx */ `
      <div className="flex items-center justify-center text-sm font-bold bg-white shadow-md border-gray-200" />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
          'shadow-md border-gray-200',
        )}
      />;
    `,
  );

  testFormat(
    'uses first function from tailwindFunctions as wrapper name',
    { classNameThreshold: 2, tailwindFunctions: ['clsx', 'cva'] },
    dedent /* tsx */ `
      <div className="flex items-center text-sm font-bold" />;
    `,
    dedent /* tsx */ `
      <div className={clsx('flex items-center', 'text-sm font-bold')} />;
    `,
  );
});

describe('handle-string-literal: cva target (target = "cva")', () => {
  testFormat(
    'leaves StringLiteral unchanged when class count <= threshold',
    { classNameThreshold: 5 },
    dedent /* ts */ ` const b = cva('flex items-center'); `,
    dedent /* ts */ ` const b = cva('flex items-center'); `,
  );

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
});

describe('handle-string-literal: complex class tokens and whitespace handling', () => {
  testFormat(
    'correctly groups important modifier ! classes',
    { classNameThreshold: 4 },
    dedent /* tsx */ `
      <div className="absolute top-0 !font-bold text-sm !bg-red-500 bg-white shadow-md" />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'absolute top-0',
          '!font-bold text-sm',
          '!bg-red-500 bg-white',
          'shadow-md',
        )}
      />;
    `,
  );

  testFormat(
    'correctly groups negative numeric - classes',
    { classNameThreshold: 4 },
    dedent /* tsx */ `
      <div className="-top-4 -left-2 text-sm font-bold -m-4 -p-2 shadow-md" />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          '-top-4 -left-2',
          '-m-4 -p-2',
          'text-sm font-bold',
          'shadow-md',
        )}
      />;
    `,
  );

  testFormat(
    'correctly groups pseudo/variant prefixes with important modifier ! and negative -',
    { classNameThreshold: 4 },
    dedent /* tsx */ `
      <div className="md:hover:!text-sm hover:!bg-red-500 dark:hover:-top-2 [&_p]:-mt-4 shadow-md" />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'dark:hover:-top-2',
          '[&_p]:-mt-4',
          'md:hover:!text-sm',
          'hover:!bg-red-500',
          'shadow-md',
        )}
      />;
    `,
  );

  testFormat(
    'handles extra whitespace in class string',
    { classNameThreshold: 2 },
    dedent /* tsx */ `
      <div className="  text-sm   font-bold   bg-white  " />;
    `,
    dedent /* tsx */ `
      <div className={cn('text-sm font-bold', 'bg-white')} />;
    `,
  );
});
