import type { UserConfig } from 'tsdown';
import { expectTypeOf, it } from 'vitest';
import { cjs, esm, esm_cjs } from '.';

it('config esm', () => {
  expectTypeOf(esm).toExtend<UserConfig>();
  expectTypeOf(cjs).toExtend<UserConfig>();
  expectTypeOf(esm_cjs).toExtend<UserConfig>();
});
