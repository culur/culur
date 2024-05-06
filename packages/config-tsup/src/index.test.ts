import { expectTypeOf, test } from 'vitest';
import { cjs, esm, esm_cjs } from './index';
import { Options } from './helper';

test('Config', () => {
  expectTypeOf(esm_cjs).toMatchTypeOf<Options>();
  expectTypeOf(esm).toMatchTypeOf<Options>();
  expectTypeOf(cjs).toMatchTypeOf<Options>();
});
