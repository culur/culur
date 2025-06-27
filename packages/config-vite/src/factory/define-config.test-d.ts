import type { ConfigEnv } from 'vite';
import type { ViteUserConfig } from 'vitest/config';
import { describe, expectTypeOf, it } from 'vitest';
import { defineConfig } from './define-config';

describe('defineConfig', () => {
  it('default empty', () => {
    const config = defineConfig();
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });

  it('object', () => {
    const config = defineConfig({});
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });

  it('promise object', async () => {
    const configFn = defineConfig(Promise.resolve({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<ViteUserConfig>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });

  it('function object', async () => {
    const configFn = defineConfig(_env => ({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<ViteUserConfig>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });

  it('function promise object', async () => {
    const configFn = defineConfig(async _env => ({}));
    expectTypeOf(configFn).toEqualTypeOf<
      (env: ConfigEnv) => Promise<ViteUserConfig>
    >();

    const config = await configFn({ command: 'build', mode: 'dev' });
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });
});
