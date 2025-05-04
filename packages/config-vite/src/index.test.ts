import type { UserConfig } from 'vite';
import { expect, expectTypeOf, it } from 'vitest';
import { vite, vitest } from '.';

it('vite config', () => {
  const config = vite;
  expectTypeOf(config).toEqualTypeOf<UserConfig>();
});

it('vitest config', () => {
  const config = vitest;
  expect(config.test).not.toBeUndefined();
  expectTypeOf(config).toEqualTypeOf<UserConfig>();
});
