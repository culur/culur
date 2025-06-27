import type { ViteUserConfig } from 'vitest/config';
import type { UserConfigExtends } from '~/types';
import tsconfigPaths from 'vite-tsconfig-paths';

const defineTsconfigPathsPlugin = (
  pluginTsconfigPaths: UserConfigExtends['pluginTsconfigPaths'] = true,
) =>
  pluginTsconfigPaths &&
  tsconfigPaths(
    pluginTsconfigPaths === true //
      ? { ignoreConfigErrors: true }
      : pluginTsconfigPaths,
  );

export const defineConfigPlugins = <TOptions extends UserConfigExtends>(
  options: TOptions,
) => {
  const tsconfigPathsPlugin = defineTsconfigPathsPlugin(
    options.pluginTsconfigPaths,
  );
  const plugins = options.plugins ?? [];

  return [tsconfigPathsPlugin, ...plugins] as ViteUserConfig['plugins'];
};
