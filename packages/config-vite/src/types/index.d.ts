import type { MergeDeep } from '@culur/types';
import type { ConfigEnv, UserConfig } from 'vite';
import type viteTsconfigPaths from 'vite-tsconfig-paths';

//! VitestInlineConfig
export type VitestInlineConfig = NonNullable<UserConfig['test']>;
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

export type UserConfigGetter<TUserConfigExtends extends UserConfigExtends> =
  | TUserConfigExtends
  | Promise<TUserConfigExtends>
  | ((env: ConfigEnv) => TUserConfigExtends | Promise<TUserConfigExtends>);

//! Plugins
export type TsconfigPathsOptions = Parameters<typeof viteTsconfigPaths>[0];
