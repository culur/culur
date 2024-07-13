import type { Awaitable, TypedFlatConfigItem } from '@antfu/eslint-config';

export type OverrideConfig = {
  name: NonNullable<TypedFlatConfigItem['name']>;
} & (
  | { partialConfig: TypedFlatConfigItem } // merge with the original config
  | { entireConfig: () => Awaitable<TypedFlatConfigItem> } // replace the entire config
);

export const defineOverride = (config: OverrideConfig) =>
  [
    config.name,
    'partialConfig' in config ? config.partialConfig : config.entireConfig,
  ] as const;
