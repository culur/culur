import type { Plugin } from 'prettier';
import dedent from 'dedent';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';
import { describe } from 'vitest';
import plugin from '../index';
import { testFormat } from './utils/test-format';

describe('comment preservation in cn() and cva([])', () => {
  const options = {
    plugins: [plugin, tailwindPlugin as unknown as Plugin],
    classNameThreshold: 5,
    tailwindFunctions: ['cn'],
  };

  testFormat(
    'succeeds for comments outside of cn() arguments',
    options,
    dedent`
      // Component comment
      <div
        // Attribute comment
        className={cn('flex items-center justify-center text-sm font-bold bg-white shadow-md')} // End of JSX attribute
      />;
    `,
    dedent`
      // Component comment
      <div
        // Attribute comment
        className={cn(
          'flex items-center justify-center',
          'text-sm font-bold',
          'bg-white',
          'shadow-md',
        )} // End of JSX attribute
      />;
    `,
  );

  testFormat(
    'bails out and preserves comments when placed inside cn() or end-of-line',
    options,
    dedent`
      <div
        className={cn(
          // Inner layout comment
          'flex items-center', // Trailing comment
          'bg-red-500 text-white font-bold p-4 shadow-md',
        )}
      />;
    `,
    // Since it bails out, it keeps the original formatting of the strings,
    // but prettier-plugin-tailwindcss core still sorts the classes inside the string.
    dedent`
      <div
        className={cn(
          // Inner layout comment
          'flex items-center', // Trailing comment
          'bg-red-500 p-4 font-bold text-white shadow-md',
        )}
      />;
    `,
  );

  testFormat(
    'bails out for comments inside cva([]) array',
    options,
    dedent`
      const button = cva([
        // Array item comment
        'inline-flex items-center justify-center rounded-md text-sm font-medium p-4 bg-primary',
      ]);
    `,
    dedent`
      const button = cva([
        // Array item comment
        'inline-flex items-center justify-center rounded-md text-sm font-medium p-4 bg-primary',
      ]);
    `,
  );

  testFormat(
    'preserves sparse array hole on comment bail-out in cva([]) array',
    options,
    dedent`
      const button = cva([
        ,
        // Array item comment
        'inline-flex items-center justify-center rounded-md text-sm font-medium p-4 bg-primary',
      ]);
    `,
    dedent`
      const button = cva([
        ,
        // Array item comment
        'inline-flex items-center justify-center rounded-md text-sm font-medium p-4 bg-primary',
      ]);
    `,
  );

  testFormat(
    'bails out when simplifying short string with comments',
    { ...options, classNameThreshold: 10 },
    dedent`
      <div
        className={cn(
          // short comment
          'flex items-center',
        )}
      />;
    `,
    dedent`
      <div
        className={cn(
          // short comment
          'flex items-center',
        )}
      />;
    `,
  );

  testFormat(
    'bails out when a bare className string literal has comments attached',
    options,
    dedent`
      <div
        className={
          /* comment attached to literal */
          'flex items-center justify-center p-4 bg-red-500 shadow-md text-white'
        }
      />;
    `,
    // Note: prettier core simplifies literal string in {} when possible,
    // but because there is a comment inside {}, it preserves the block.
    dedent`
      <div
        className={
          /* comment attached to literal */
          'flex items-center justify-center bg-red-500 p-4 text-white shadow-md'
        }
      />;
    `,
  );

  testFormat(
    'bails out when a plain className string literal has comments attached',
    options,
    dedent`
      <div className=/* comment */"flex items-center justify-center p-4 bg-red-500 shadow-md text-white" />;
    `,
    dedent`
      <div className=/* comment */ "flex items-center justify-center bg-red-500 p-4 text-white shadow-md" />;
    `,
  );

  testFormat(
    'bails out for comments on a bare cva string literal',
    options,
    dedent`
      const button = cva(
        /* comment */
        'inline-flex items-center justify-center rounded-md text-sm font-medium p-4 bg-primary'
      );
    `,
    dedent`
      const button = cva(
        /* comment */
        'inline-flex items-center justify-center rounded-md text-sm font-medium p-4 bg-primary',
      );
    `,
  );
});
