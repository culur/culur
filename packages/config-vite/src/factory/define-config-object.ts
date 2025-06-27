import type { ViteUserConfig } from 'vitest/config';
import type { UserConfigExtends } from '~/types';
import { defineConfig } from 'vitest/config';
import { defineConfigPlugins } from './options-plugins';
import { defineConfigTest } from './options-vitest';

export const defineConfigObject = <
  TOptions extends UserConfigExtends = { test?: false },
>(
  options_?: TOptions,
): ViteUserConfig => {
  const defaultOptions: UserConfigExtends = { test: false };
  const options = options_ ?? (defaultOptions as TOptions);

  const plugins = defineConfigPlugins(options);
  const test = defineConfigTest(options.test);

  const {
    pluginTsconfigPaths: _pluginTsconfigPaths,
    plugins: _plugins,
    test: _test,
    ...restOptions
  } = options;

  const config: ViteUserConfig = {
    plugins,
    ...restOptions,
  };
  if (options.test) config.test = test;
  return defineConfig(config);
};
