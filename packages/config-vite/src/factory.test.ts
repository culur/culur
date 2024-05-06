import { UserConfig as UserConfigVite } from 'vite';
import { assert, describe, expectTypeOf, test } from 'vitest';
import { UserConfig as UserConfigVitest } from 'vitest/config';
import { defineConfig } from './factory';

test('Vite config', () => {
  const config = defineConfig({ vitest: false });

  expectTypeOf(config).toEqualTypeOf<UserConfigVite | UserConfigVitest>();
});

describe('Vitest config', () => {
  test('Vitest config by default', () => {
    const config = defineConfig();

    expectTypeOf(config).toEqualTypeOf<UserConfigVite | UserConfigVitest>();
  });

  test('Vitest config by options', () => {
    const config = defineConfig({ vitest: true });

    expectTypeOf(config).toEqualTypeOf<UserConfigVite | UserConfigVitest>();
  });
});

describe('Vitest config with tsconfigPath', () => {
  test('tsconfigPath = true', () => {
    const config = defineConfig({ tsconfigPaths: true });

    expectTypeOf(config).toEqualTypeOf<UserConfigVite | UserConfigVitest>();
    assert(typeof config.plugins?.[0] === 'object');
  });

  test('tsconfigPath = object', () => {
    const config = defineConfig({ tsconfigPaths: {} });

    expectTypeOf(config).toEqualTypeOf<UserConfigVite | UserConfigVitest>();
    assert(typeof config.plugins?.[0] === 'object');
  });
});
