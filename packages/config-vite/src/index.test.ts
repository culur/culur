import { expect, expectTypeOf, it } from 'vitest';
import type { UserConfigVite, UserConfigVitest } from './types';
import { vite, vitest } from '.';

it('vite config', () => {
  const config = vite;
  expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
});

it('vitest config', () => {
  const config = vitest;
  expect(config.test).not.toBeUndefined();
  expectTypeOf(config).toEqualTypeOf<UserConfigVitest>();
});
