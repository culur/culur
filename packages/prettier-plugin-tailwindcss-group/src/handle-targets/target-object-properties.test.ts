import dedent from 'dedent';
import { describe } from 'vitest';
import { testFormat } from '../__tests__/utils/test-format';

describe('target-object-properties: validation and bypassing', () => {
  testFormat(
    'ignores plain string value (not a CallExpression)',
    { classNameThreshold: 1 },
    dedent /* ts */ ` const s = { className: 'flex items-center' }; `,
    dedent /* ts */ ` const s = { className: 'flex items-center' }; `,
  );

  testFormat(
    'ignores unrelated object properties',
    { classNameThreshold: 1 },
    dedent /* ts */ `
      const s = { style: cn('flex items-center'), id: cn('foo bar') };
    `,
    dedent /* ts */ `
      const s = { style: cn('flex items-center'), id: cn('foo bar') };
    `,
  );

  testFormat(
    'ignores CallExpression with callee not in tailwindFunctions',
    { classNameThreshold: 1, tailwindFunctions: ['cn'] },
    dedent /* ts */ `
      const s = { className: otherFn('flex items-center text-sm font-bold') };
    `,
    dedent /* ts */ `
      const s = { className: otherFn('flex items-center text-sm font-bold') };
    `,
  );
});

describe('target-object-properties: key pattern matching', () => {
  testFormat(
    'formats wrapperClassName object property',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const s = {
        wrapperClassName: cn(
          'flex items-center justify-center text-sm font-bold bg-white',
        ),
      };
    `,
    dedent /* ts */ `
      const s = {
        wrapperClassName: cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
        ),
      };
    `,
  );

  testFormat(
    'formats wrapperclassName (lowercase c) object property',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const s = {
        wrapperclassName: cn(
          'flex items-center justify-center text-sm font-bold bg-white',
        ),
      };
    `,
    dedent /* ts */ `
      const s = {
        wrapperclassName: cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
        ),
      };
    `,
  );
});

describe('target-object-properties: formatting behavior', () => {
  testFormat(
    'regroups static strings when > threshold',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const s = {
        className: cn(
          'flex items-center justify-center text-sm font-bold bg-white',
        ),
      };
    `,
    dedent /* ts */ `
      const s = {
        className: cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
        ),
      };
    `,
  );

  testFormat(
    'merges multiple static args into single string in cn() when <= threshold (never simplifies to StringLiteral)',
    { classNameThreshold: 5 },
    dedent /* ts */ ` const s = { className: cn('flex', 'items-center') }; `,
    dedent /* ts */ ` const s = { className: cn('flex items-center') }; `,
  );

  testFormat(
    'moves static args to front and preserves dynamic args at end',
    { classNameThreshold: 4 },
    dedent /* ts */ `
      const s = {
        className: cn(
          isActive && 'bg-blue-500',
          'flex items-center text-sm font-bold bg-white',
          { 'opacity-50': disabled },
        ),
      };
    `,
    dedent /* ts */ `
      const s = {
        className: cn(
          'flex items-center',
          'text-sm font-bold',
          'bg-white',
          isActive && 'bg-blue-500',
          { 'opacity-50': disabled },
        ),
      };
    `,
  );

  testFormat(
    'leaves untouched when only dynamic args exist',
    { classNameThreshold: 4 },
    dedent /* ts */ ` const s = { className: cn(isActive && 'bg-blue-500') }; `,
    dedent /* ts */ ` const s = { className: cn(isActive && 'bg-blue-500') }; `,
  );
});
