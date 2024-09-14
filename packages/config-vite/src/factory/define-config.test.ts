import type { ConfigEnv } from 'vite';
import { describe, expectTypeOf, it } from 'vitest';
import type { UserConfigVite } from '~/types';
import { defineConfig } from './define-config';

describe('defineConfig', () => {
  it('default empty', () => {
    const config = defineConfig();
    expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
  });

  it('object', () => {
    const config = defineConfig({});
    expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
  });

  it('promise object', async () => {
    const configFn = defineConfig(Promise.resolve({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<UserConfigVite>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
  });

  it('function object', async () => {
    const configFn = defineConfig(_env => ({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<UserConfigVite>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
  });

  it('function promise object', async () => {
    const configFn = defineConfig(async _env => ({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<UserConfigVite>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<UserConfigVite>();
  });
});
