import type { Options } from 'tsup';
import { expectTypeOf, it } from 'vitest';
import { cjs, esm, esm_cjs } from '.';

it('config esm', () => {
  expectTypeOf(esm).toMatchTypeOf<Options>();
  expectTypeOf(cjs).toMatchTypeOf<Options>();
  expectTypeOf(esm_cjs).toMatchTypeOf<Options>();
});
