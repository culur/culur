import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('target-jsx: validation and bypassing unrelated attributes', () => {
  testFormat(
    'ignores non-className attributes such as id and style',
    { classNameThreshold: 1 },
    dedent /* tsx */ `
      <div id="flex items-center text-sm font-bold" style="color: red" />;
    `,
    dedent /* tsx */ `
      <div id="flex items-center text-sm font-bold" style="color: red" />;
    `,
  );

  testFormat(
    'ignores empty className attribute',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className="" />; `,
    dedent /* tsx */ ` <div className="" />; `,
  );

  testFormat(
    'ignores valueless className attribute',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className />; `,
    dedent /* tsx */ ` <div className />; `,
  );
});

describe('target-jsx: matching supported className patterns', () => {
  testFormat(
    'formats wrapperClassName when class count > threshold',
    { classNameThreshold: 4 },
    dedent /* tsx */ `
      <div wrapperClassName="flex items-center justify-center text-sm font-bold bg-white shadow-md" />;
    `,
    dedent /* tsx */ `
      <div
        wrapperClassName={cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
          'shadow-md',
        )}
      />;
    `,
  );

  testFormat(
    'formats containerClassName when class count > threshold',
    { classNameThreshold: 4 },
    dedent /* tsx */ `
      <div containerClassName="flex items-center justify-center text-sm font-bold bg-white shadow-md" />;
    `,
    dedent /* tsx */ `
      <div
        containerClassName={cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
          'shadow-md',
        )}
      />;
    `,
  );
});

describe('target-jsx: case 1: stringLiteral value', () => {
  testFormat(
    'leaves StringLiteral unchanged when class count <= threshold',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className="btn primary active" />; `,
    dedent /* tsx */ ` <div className="btn primary active" />; `,
  );

  testFormat(
    'wraps in function call when class count > threshold',
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
});

describe('target-jsx: case 2: JSXExpressionContainer with stringLiteral', () => {
  testFormat(
    'simplifies to StringLiteral when class count <= threshold',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={'btn primary active'} />; `,
    dedent /* tsx */ ` <div className="btn primary active" />; `,
  );

  testFormat(
    'wraps in function call when class count > threshold',
    { classNameThreshold: 2 },
    dedent /* tsx */ `
      <div className={'flex items-center text-sm font-bold'} />;
    `,
    dedent /* tsx */ `
      <div className={cn('flex items-center', 'text-sm font-bold')} />;
    `,
  );
});

describe('target-jsx: case 3: JSXExpressionContainer with callExpression', () => {
  testFormat(
    'simplifies single static string argument to StringLiteral if <= threshold',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn('text-sm font-bold')} />; `,
    dedent /* tsx */ ` <div className="text-sm font-bold" />; `,
  );

  testFormat(
    'merges multiple static string arguments and simplifies to StringLiteral if <= threshold',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn('text-sm', 'font-bold')} />; `,
    dedent /* tsx */ ` <div className="text-sm font-bold" />; `,
  );

  testFormat(
    'groups static strings to front and preserves dynamic arguments when > threshold',
    { classNameThreshold: 4 },
    dedent /* tsx */ `
      <div
        className={cn(
          isActive && 'bg-blue-500',
          'flex items-center text-sm font-bold',
          { 'opacity-50': disabled },
          'p-4',
        )}
      />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'flex items-center',
          'p-4',
          'text-sm font-bold',
          isActive && 'bg-blue-500',
          { 'opacity-50': disabled },
        )}
      />;
    `,
  );

  testFormat(
    'does not simplify when dynamic arguments exist even if static count <= threshold',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn('flex', isActive && 'text-sm')} />; `,
    dedent /* tsx */ ` <div className={cn('flex', isActive && 'text-sm')} />; `,
  );

  testFormat(
    'ignores CallExpression with callee not in tailwindFunctions',
    { classNameThreshold: 1, tailwindFunctions: ['cn'] },
    dedent /* tsx */ `
      <div className={unrelatedFn('flex items-center text-sm font-bold')} />;
    `,
    dedent /* tsx */ `
      <div className={unrelatedFn('flex items-center text-sm font-bold')} />;
    `,
  );

  testFormat(
    'supports custom tailwindFunctions',
    { classNameThreshold: 2, tailwindFunctions: ['clsx', 'cva'] },
    dedent /* tsx */ `
      <div
        className={clsx(
          'flex items-center text-sm font-bold',
          isActive && 'bg-white',
        )}
      />;
    `,
    dedent /* tsx */ `
      <div
        className={clsx(
          'flex items-center',
          'text-sm font-bold',
          isActive && 'bg-white',
        )}
      />;
    `,
  );

  testFormat(
    'preserves nested JSX element inside cn() arguments as dynamic expression',
    { classNameThreshold: 2 },
    dedent /* tsx */ `
      <div
        className={cn(
          <span />,
          'flex items-center justify-center text-sm font-bold bg-white',
        )}
      />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
          <span />,
        )}
      />;
    `,
  );

  testFormat(
    'handles nested helper function call cn(...) inside outer cn(...) as dynamic argument',
    { classNameThreshold: 2 },
    dedent /* tsx */ `
      <div
        className={cn(
          cn('text-sm font-bold', isActive && 'text-blue-500'),
          'flex items-center bg-white',
        )}
      />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'flex items-center',
          'bg-white',
          cn('text-sm font-bold', isActive && 'text-blue-500'),
        )}
      />;
    `,
  );
});
