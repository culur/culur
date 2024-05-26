import { expectTypeOf, it } from 'vitest';
import type { Options } from 'tsup';
import { cjs, esm, esm_cjs } from './index';

it('config esm', () => {
  expectTypeOf(esm).toMatchTypeOf<Options>();
  expectTypeOf(cjs).toMatchTypeOf<Options>();
  expectTypeOf(esm_cjs).toMatchTypeOf<Options>();
});
