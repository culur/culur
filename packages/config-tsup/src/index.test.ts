import type { Options } from 'tsup';
import { expectTypeOf, it } from 'vitest';
import { cjs, esm, esm_cjs } from '.';

it('config esm', () => {
  expectTypeOf(esm).toExtend<Options>();
  expectTypeOf(cjs).toExtend<Options>();
  expectTypeOf(esm_cjs).toExtend<Options>();
});
