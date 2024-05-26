import type { Awaitable, TypedFlatConfigItem } from '@antfu/eslint-config';

export interface OverrideConfig {
  name: NonNullable<TypedFlatConfigItem['name']>;
  config: TypedFlatConfigItem | (() => Awaitable<TypedFlatConfigItem>);
}

export const defineOverride = ({ name, config }: OverrideConfig) =>
  [name, config] as const;
