import type { UserConfig } from 'vite';
import { describe, expectTypeOf, it } from 'vitest';
import { defineConfigObject } from './define-config-object';

describe('defineConfigSync', () => {
  it('default', () => {
    const config = defineConfigObject();
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });

  it('vite', () => {
    const config = defineConfigObject({ test: false });
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });

  it('vitest', () => {
    const config = defineConfigObject({ test: true });
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });
});

describe('pluginTsconfigPaths', () => {
  it('pluginTsconfigPaths = true', () => {
    const config = defineConfigObject({ pluginTsconfigPaths: true });
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });

  it('pluginTsconfigPaths = object', async () => {
    const config = defineConfigObject({ pluginTsconfigPaths: {} });
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });
});
