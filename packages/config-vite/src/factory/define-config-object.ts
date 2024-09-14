import type { UserConfig as UserConfigVite_ } from 'vite';
import type { UserConfig as UserConfigVitest_ } from 'vitest/config';
import { defineConfig as defineConfigVite } from 'vite';
import { defineConfig as defineConfigVitest } from 'vitest/config';
import type { Options, UserConfig } from '~/types';
import { defineConfigPlugins } from './options-plugins';
import { defineConfigTest } from './options-vitest';

export const defineConfigObject = <TOptions extends Options = { test?: false }>(
  options_?: TOptions,
): UserConfig<TOptions> => {
  const defaultOptions: Options = { test: false };
  const options = options_ ?? (defaultOptions as TOptions);

  const plugins = defineConfigPlugins(options);
  const test = defineConfigTest(options.test);

  const {
    pluginTsconfigPaths: _pluginTsconfigPaths,
    plugins: _plugins,
    test: _test,
    ...restOptions
  } = options;

  if (options.test) {
    const userConfig = { plugins, test, ...restOptions } as UserConfigVitest_;
    return defineConfigVitest(userConfig) as UserConfig<TOptions>;
  } else {
    const userConfig = { plugins, ...restOptions } as UserConfigVite_;
    return defineConfigVite(userConfig) as UserConfig<TOptions>;
  }
};
