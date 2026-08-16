import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('handle-expressions: no static strings / dynamic only', () => {
  testFormat(
    'leaves empty function call untouched',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn()} />; `,
    dedent /* tsx */ ` <div className={cn()} />; `,
  );

  testFormat(
    'leaves dynamic-only arguments untouched',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn(isActive && 'text-sm')} />; `,
    dedent /* tsx */ ` <div className={cn(isActive && 'text-sm')} />; `,
  );
});

describe('handle-expressions: empty and whitespace-only static strings', () => {
  testFormat(
    'simplifies pure empty string literal to empty string literal',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn('')} />; `,
    dedent /* tsx */ ` <div className="" />; `,
  );

  testFormat(
    'strips whitespace-only static strings when dynamic arguments exist',
    { classNameThreshold: 5 },
    dedent /* tsx */ `
      <div className={cn(' ', '   ', isEnabled && 'text-bold')} />;
    `,
    dedent /* tsx */ ` <div className={cn(isEnabled && 'text-bold')} />; `,
  );

  testFormat(
    'strips multiple pure empty strings when dynamic arguments exist',
    { classNameThreshold: 5 },
    dedent /* tsx */ `
      <div className={cn('', '', '', isActive && 'text-sm')} />;
    `,
    dedent /* tsx */ ` <div className={cn(isActive && 'text-sm')} />; `,
  );

  testFormat(
    'simplifies whitespace-only static string to empty string literal',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn('   ')} />; `,
    dedent /* tsx */ ` <div className="" />; `,
  );
});

describe('handle-expressions: class count within threshold (<= classNameThreshold)', () => {
  testFormat(
    'simplifies single static string to StringLiteral',
    { classNameThreshold: 5 },
    dedent /* tsx */ ` <div className={cn('text-sm font-bold')} />; `,
    dedent /* tsx */ ` <div className="text-sm font-bold" />; `,
  );

  testFormat(
    'merges multiple static string arguments into single StringLiteral',
    { classNameThreshold: 5 },
    dedent /* tsx */ `
      <div className={cn('flex items-center', 'text-sm font-bold')} />;
    `,
    dedent /* tsx */ `
      <div className="flex items-center text-sm font-bold" />;
    `,
  );

  testFormat(
    'merges static strings but preserves CallExpression when dynamic arguments exist',
    { classNameThreshold: 5 },
    dedent /* tsx */ `
      <div className={cn('flex', 'items-center', isActive && 'text-sm')} />;
    `,
    dedent /* tsx */ `
      <div className={cn('flex items-center', isActive && 'text-sm')} />;
    `,
  );
});

describe('handle-expressions: class count exceeds threshold (> classNameThreshold)', () => {
  testFormat(
    'groups static classes into multiple StringLiterals',
    { classNameThreshold: 1 },
    dedent /* tsx */ ` <div className={cn('text-sm font-bold')} />; `,
    dedent /* tsx */ ` <div className={cn('text-sm font-bold')} />; `,
  );

  testFormat(
    'gathers scattered static strings to front, groups them, and keeps dynamic arguments at end',
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
    'uses default options threshold for regrouping',
    {},
    dedent /* tsx */ `
      <div
        className={cn(
          isActive && 'text-sm',
          'c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18 c19 c20 c21',
        )}
      />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18 c19 c20 c21',
          isActive && 'text-sm',
        )}
      />;
    `,
  );
});
