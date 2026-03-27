import type { MergeDeep } from '@culur/types';
import type { ViteUserConfig } from 'vitest/config';
import type { InlineConfig as VitestInlineConfig } from 'vitest/node';

//! VitestInlineConfig
export type { VitestInlineConfig };
export type VitestInlineConfigCustom = MergeDeep<
  VitestInlineConfig,
  { coverage?: { excludeExtends?: string[] } }
>;

//! UserConfig
export type UserConfigExtends = ViteUserConfig &
  (
    | { test?: false } //
    | { test: true | VitestInlineConfigCustom }
  );
