import type { ConfigEnv, UserConfig } from 'vite';
import { describe, expectTypeOf, it } from 'vitest';
import { defineConfig } from './define-config';

describe('defineConfig', () => {
  it('default empty', () => {
    const config = defineConfig();
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });

  it('object', () => {
    const config = defineConfig({});
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });

  it('promise object', async () => {
    const configFn = defineConfig(Promise.resolve({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<UserConfig>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });

  it('function object', async () => {
    const configFn = defineConfig(_env => ({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<UserConfig>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });

  it('function promise object', async () => {
    const configFn = defineConfig(async _env => ({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<UserConfig>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<UserConfig>();
  });
});
