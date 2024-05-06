import {
  Plugin,
  UserConfig as UserConfigVite,
  defineConfig as defineConfigVite,
} from 'vite';
import tsconfigPaths, { PluginOptions } from 'vite-tsconfig-paths';
import {
  UserConfig as UserConfigVitest,
  defineConfig as defineConfigVitest,
} from 'vitest/config';

type Options = {
  vitest?: boolean;
  tsconfigPaths?: boolean | PluginOptions;
};

export const defineConfig = (options?: Options) => {
  const tsconfigPathsOptions: false | PluginOptions =
    options?.tsconfigPaths === true
      ? { ignoreConfigErrors: true }
      : options?.tsconfigPaths ?? { ignoreConfigErrors: true };
  const vitest = options?.vitest ?? true;

  const plugins: (Plugin | false)[] = [
    tsconfigPathsOptions && tsconfigPaths(tsconfigPathsOptions),
  ];
  const test: UserConfigVitest['test'] = {
    typecheck: {
      tsconfig: './tsconfig.json',
      include: ['**/*.test.ts'],
    },
    coverage: {
      enabled: true,
      reporter: ['text', 'html', 'json'],
    },
  };

  return vitest
    ? defineConfigVitest({
        plugins: plugins as UserConfigVitest['plugins'],
        test,
      })
    : defineConfigVite({
        plugins: plugins as UserConfigVite['plugins'],
      });
};
