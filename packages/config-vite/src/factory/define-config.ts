import type { ConfigEnv, UserConfig } from 'vite';
import type { UserConfigExtends, UserConfigGetter } from '~/types';
import { defineConfigObject } from './define-config-object';

export function defineConfig<
  TOptions extends UserConfigExtends = { test: false },
>(
  config?: UserConfigExtends | TOptions, // for auto-completion
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
  config?: UserConfigGetter<TUserConfig>,
) {
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
