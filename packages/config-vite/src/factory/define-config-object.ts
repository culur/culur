import type { ViteUserConfig } from 'vitest/config';
import type { UserConfigExtends } from '~/types';
import { defineConfig } from 'vitest/config';
import { defineConfigTest } from './options-vitest';

export const defineConfigObject = <
  TOptions extends UserConfigExtends = { test?: false },
>(
  options_?: TOptions,
): ViteUserConfig => {
  const defaultOptions: UserConfigExtends = { test: false };
  const options = options_ ?? (defaultOptions as TOptions);

  const test = defineConfigTest(options.test);

  const {
    resolve: _resolve, //
    test: _test,
    ...restOptions
  } = options;

  const config: ViteUserConfig = {
    resolve: {
      tsconfigPaths: true,
      ...options.resolve,
    },
    ...restOptions,
  };
  if (options.test) config.test = test;
  return defineConfig(config);
};
