import tsconfigPaths from 'vite-tsconfig-paths';
import type { Options, UserConfig } from '~/types';

const defineTsconfigPathsPlugin = (
  pluginTsconfigPaths: Options['pluginTsconfigPaths'] = true,
) =>
  pluginTsconfigPaths &&
  tsconfigPaths(
    pluginTsconfigPaths === true //
      ? { ignoreConfigErrors: true }
      : pluginTsconfigPaths,
  );

export const defineConfigPlugins = <TOptions extends Options>(
  options: TOptions,
) => {
  const tsconfigPathsPlugin = defineTsconfigPathsPlugin(
    options.pluginTsconfigPaths,
  );
  const plugins = options.plugins ?? [];

  return [tsconfigPathsPlugin, ...plugins] as UserConfig<TOptions>['plugins'];
};
