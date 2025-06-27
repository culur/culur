import type { ViteUserConfig } from 'vitest/config';
import { expect, expectTypeOf, it } from 'vitest';
import { vite, vitest } from '.';

it('vite config', () => {
  const config = vite;
  expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
});

it('vitest config', () => {
  const config = vitest;
  expect(config.test).not.toBeUndefined();
  expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
});
