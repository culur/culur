import type antfu from '@antfu/eslint-config';
import { expectTypeOf, it } from 'vitest';
import defineConfig from '.';

it('should be valid', () => {
  const config = defineConfig();

  expectTypeOf(config).toEqualTypeOf<ReturnType<typeof antfu>>();
  expectTypeOf(defineConfig).toEqualTypeOf<typeof antfu>();
});
