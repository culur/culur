import type antfu from '@antfu/eslint-config';
import { assert, expectTypeOf, it } from 'vitest';
import defineConfig from '.';

it('default config', async () => {
  const config = await defineConfig({ vue: false });

  const configItem = config.find(c => c.name === 'antfu/vue/rules');
  assert(!configItem);

  expectTypeOf(config).toEqualTypeOf<Awaited<ReturnType<typeof antfu>>>();
  expectTypeOf(defineConfig).toEqualTypeOf<typeof antfu>();
});

it('hasVue() config', async () => {
  const config = await defineConfig({ vue: true });

  const configItem = config.find(c => c.name === 'antfu/vue/rules');
  assert(configItem && configItem.rules);

  expectTypeOf(config).toEqualTypeOf<Awaited<ReturnType<typeof antfu>>>();
  expectTypeOf(defineConfig).toEqualTypeOf<typeof antfu>();
});
