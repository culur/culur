import tsconfigPaths from 'vite-tsconfig-paths';
import type { Options } from '~/types';

const defineTsconfigPathsPlugin = (
  pluginTsconfigPaths: Options['pluginTsconfigPaths'] = true,
) =>
  pluginTsconfigPaths &&
  tsconfigPaths(
    pluginTsconfigPaths === true //
      ? { ignoreConfigErrors: true }
      : pluginTsconfigPaths,
  );

export const defineConfigPlugins = (options: Options) => {
  const tsconfigPathsPlugin = defineTsconfigPathsPlugin(
    options.pluginTsconfigPaths,
  );
  const plugins = options.plugins ?? [];

  return [tsconfigPathsPlugin, ...plugins];
};
