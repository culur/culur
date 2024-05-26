import { defineConfig as defineConfigVite } from 'vite';
import { defineConfig as defineConfigVitest } from 'vitest/config';
import { defineConfigPlugins } from './options-plugins';
import { defineConfigTest } from './options-vitest';
import type { Options, UserConfig } from '~/types';

export const defineConfigObject = <TOptions extends Options = { test?: false }>(
  options_?: TOptions,
): UserConfig<TOptions> => {
  const defaultOptions: Options = { test: false };
  const options = options_ ?? defaultOptions;

  const plugins = defineConfigPlugins(options);
  const test = defineConfigTest(options.test);

  const {
    pluginTsconfigPaths: _pluginTsconfigPaths,
    plugins: _plugins,
    test: _test,
    ...restOptions
  } = options;

  return options.test
    ? defineConfigVitest({ plugins, test, ...restOptions })
    : defineConfigVite({ plugins, ...restOptions });
};
