import type { ConfigEnv } from 'vite';
import type { Awaitable, Options, OptionsExport, UserConfig } from '~/types';
import { defineConfigObject } from './define-config-object';

export function defineConfig<TOptions extends Options = { test: false }>(
  config?: Options | TOptions, // for auto-completion
): UserConfig<TOptions>;

export function defineConfig<TOptions extends Options>(
  config: Promise<Options | TOptions>, // for auto-completion
): (env: ConfigEnv) => Promise<UserConfig<TOptions>>;

export function defineConfig<TOptions extends Options>(
  config: (env: ConfigEnv) => Awaitable<Options | TOptions>, // for auto-completion
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
