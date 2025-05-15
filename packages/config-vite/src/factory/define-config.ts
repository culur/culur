import type { ConfigEnv, UserConfig } from 'vite';
import type { UserConfigExtends } from '~/types';
import { defineConfigObject } from './define-config-object';

export function defineConfig<TUserConfig extends UserConfigExtends>(
  config?: UserConfigExtends | TUserConfig, // for auto-completion
): UserConfig;

export function defineConfig<TUserConfig extends UserConfigExtends>(
  config: Promise<UserConfigExtends | TUserConfig>, // for auto-completion
): (env: ConfigEnv) => Promise<UserConfig>;

export function defineConfig<TUserConfig extends UserConfigExtends>(
  config: (
    env: ConfigEnv,
  ) =>
    | UserConfigExtends
    | TUserConfig
    | Promise<UserConfigExtends | TUserConfig>, // for auto-completion
): (env: ConfigEnv) => Promise<UserConfig>;

export function defineConfig<TUserConfig extends UserConfigExtends>(
  config?:
    | TUserConfig
    | Promise<TUserConfig>
    | ((env: ConfigEnv) => TUserConfig | Promise<TUserConfig>),
):
  | UserConfig
  | Promise<UserConfig>
  | ((env: ConfigEnv) => Promise<UserConfig>) {
  if (typeof config === 'function') {
    return async (env: ConfigEnv) => {
      const configObject = await config(env);
      return defineConfigObject(configObject);
    };
  }
  if (typeof config === 'object' && 'then' in config) {
    return async (_env: ConfigEnv) => {
      const configObject = await config;
      return defineConfigObject(configObject);
    };
  }
  return defineConfigObject(config);
}
