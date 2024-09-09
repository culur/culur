import { expect, expectTypeOf, it } from 'vitest';
import type { Awaitable, TypedFlatConfigItem } from '@antfu/eslint-config';
import type { OverrideConfig } from '.';
import { defineOverride } from '.';

it.each<OverrideConfig>([
  {
    name: 'object',
    partialConfig: { rules: {} },
  },
  {
    name: 'function',
    entireConfig: () => ({ rules: {} }),
  },
])('config is $name', options => {
  const overrideParameter = defineOverride(options);

  const [name, config] = overrideParameter;

  expect(typeof name).toEqual('string');
  expectTypeOf(config).toMatchTypeOf<
    TypedFlatConfigItem | (() => Awaitable<TypedFlatConfigItem>)
  >();
});
