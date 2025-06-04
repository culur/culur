import type { MergeDeep } from '@culur/types';
import type { UserConfig } from 'vite';
import type viteTsconfigPaths from 'vite-tsconfig-paths';
import type { InlineConfig as VitestInlineConfig } from 'vitest/node';

//! VitestInlineConfig
export type { VitestInlineConfig };
export type VitestInlineConfigCustom = MergeDeep<
  VitestInlineConfig,
  { coverage?: { excludeExtends?: string[] } }
>;

//! UserConfig
export type UserConfigExtends = UserConfig & {
  pluginTsconfigPaths?: boolean | TsconfigPathsOptions;
} & (
    | { test?: false } //
    | { test: true | VitestInlineConfigCustom }
  );

//! Plugins
export type TsconfigPathsOptions = Parameters<typeof viteTsconfigPaths>[0];
