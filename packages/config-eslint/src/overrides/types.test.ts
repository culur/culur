import type { Awaitable } from 'vitest';
import { expect, expectTypeOf, it } from 'vitest';
import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import type { OverrideConfig } from './types';
import { defineOverride } from './types';

it.each<OverrideConfig>([
  {
    name: 'object',
    config: { rules: {} },
  },
  {
    name: 'function',
    config: () => ({ rules: {} }),
  },
])('config is $name', options => {
  const overrideParameter = defineOverride(options);

  const [name, config] = overrideParameter;

  expect(typeof name).toEqual('string');
  expectTypeOf(config).toMatchTypeOf<
    TypedFlatConfigItem | (() => Awaitable<TypedFlatConfigItem>)
  >();
});
