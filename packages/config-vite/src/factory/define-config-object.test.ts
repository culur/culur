import { describe, expectTypeOf, it } from 'vitest';
import { defineConfigObject } from './define-config-object';
import type { UserConfigVite, UserConfigVitest } from '~/types';

describe('defineConfigSync', () => {
  it('default', () => {
    const config = defineConfigObject();
    expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
  });

  it('vite', () => {
    const config = defineConfigObject({ test: false });
    expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
  });

  it('vitest', () => {
    const config = defineConfigObject({ test: true });
    expectTypeOf(config).toEqualTypeOf<UserConfigVitest>();
  });
});

describe('pluginTsconfigPaths', () => {
  it('pluginTsconfigPaths = true', () => {
    const config = defineConfigObject({ pluginTsconfigPaths: true });
    expectTypeOf(config).toEqualTypeOf<UserConfigVitest>();
  });

  it('pluginTsconfigPaths = object', async () => {
    const config = defineConfigObject({ pluginTsconfigPaths: {} });
    expectTypeOf(config).toEqualTypeOf<UserConfigVitest>();
  });
});
