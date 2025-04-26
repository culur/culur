import type {
  Awaitable,
  Rules,
  TypedFlatConfigItem,
} from '@antfu/eslint-config';
import type { Linter } from 'eslint';

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

export type RuleEntry<T extends keyof Rules> = Rules[T] extends
  | Linter.RuleEntry<infer F>
  | undefined
  ? F
  : never;
