import type { ConfigEnv } from 'vite';
import { defineConfigObject } from './define-config-object';
import type { Options, OptionsExport, UserConfig } from '~/types';

export function defineConfig<TOptions extends Options = { test: false }>(
  config?: TOptions,
): UserConfig<TOptions>;

export function defineConfig<TOptions extends Options>(
  config: Promise<TOptions>,
): (env: ConfigEnv) => Promise<UserConfig<TOptions>>;

export function defineConfig<TOptions extends Options>(
  config: (env: ConfigEnv) => TOptions | Promise<TOptions>,
): (env: ConfigEnv) => Promise<UserConfig<TOptions>>;

export function defineConfig<TOptions extends Options>(
  configExport?: OptionsExport<TOptions>,
) {
  if (typeof configExport === 'function') {
    return async (env: ConfigEnv) => {
      const config = await configExport(env);
      return defineConfigObject(config);
    };
  }
  if (typeof configExport === 'object' && 'then' in configExport) {
    return async (_env: ConfigEnv) => {
      const config = await configExport;
      return defineConfigObject(config);
    };
  }
  return defineConfigObject(configExport);
}
