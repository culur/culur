import type {
  Awaitable,
  Rules,
  TypedFlatConfigItem,
} from '@antfu/eslint-config';
import type { Linter } from 'eslint';

export interface ExtraRules {}

export type TypedFlatConfigItemCustom = Omit<TypedFlatConfigItem, 'rules'> & {
  rules?: Omit<Rules, keyof ExtraRules> & Partial<ExtraRules>;
};

export type OverrideConfig = {
  name: NonNullable<TypedFlatConfigItemCustom['name']>;
} & (
  | { partialConfig: TypedFlatConfigItemCustom } // merge with the original config
  | { entireConfig: () => Awaitable<TypedFlatConfigItemCustom> } // replace the entire config
);

export const defineOverride = (config: OverrideConfig) =>
  [
    config.name,
    'partialConfig' in config ? config.partialConfig : config.entireConfig,
  ] as [
    name: string,
    config: TypedFlatConfigItem | (() => Awaitable<TypedFlatConfigItem>),
  ];

export type RuleEntry<T extends keyof Rules> = Rules[T] extends
  | Linter.RuleEntry<infer F>
  | undefined
  ? F
  : never;
