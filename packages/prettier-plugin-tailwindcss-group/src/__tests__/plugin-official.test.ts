import type { Plugin } from 'prettier';
import dedent from 'dedent';
import * as tailwindPlugin from 'prettier-plugin-tailwindcss';
import { describe } from 'vitest';
import plugin from '../index';
import { testFormat } from './utils/test-format';

describe('combined mode (with prettier-plugin-tailwindcss)', () => {
  testFormat(
    'allows prettier-plugin-tailwindcss to sort classes within group',
    {
      classNameThreshold: 5,
      plugins: [plugin, tailwindPlugin as unknown as Plugin],
    },
    dedent /* tsx */ `
      <div className="z-10 flex justify-center items-center p-4 font-bold text-white bg-red-500 bg-opacity-50 shadow-md shadow-black/50 opacity-50 mix-blend-multiply" />;
    `,
    dedent /* tsx */ `
      <div
        className={cn(
          'z-10',
          'flex items-center justify-center',
          'p-4',
          'font-bold text-white',
          'bg-opacity-50 bg-red-500',
          'shadow-md shadow-black/50',
          'opacity-50 mix-blend-multiply',
        )}
      />;
    `,
  );
});
