import type viteTsconfigPaths from 'vite-tsconfig-paths';
import type { ConfigEnv, UserConfig as UserConfigVite_ } from 'vite';
import type { UserConfig as UserConfigVitest_ } from 'vitest/config';

export type Awaitable<T> = T | PromiseLike<T>;

export interface UserConfigVite extends UserConfigVite_ {
  __type?: 'viteConfig';
}
export interface UserConfigVitest extends UserConfigVitest_ {
  __type?: 'vitestConfig';
}

export type VitestInlineConfig = NonNullable<UserConfigVitest['test']>;

export type TsconfigPathsOptions = Parameters<typeof viteTsconfigPaths>[0];

export type Options = {
  pluginTsconfigPaths?: boolean | TsconfigPathsOptions;
} & (
  | (UserConfigVite & { test?: false })
  | (UserConfigVitest & { test: true | UserConfigVitest['test'] })
);
export type UserConfig<TOptions extends Options> = TOptions extends {
  test?: false;
}
  ? UserConfigVite
  : UserConfigVitest;

export type OptionsExport<TOptions extends Options> =
  | TOptions
  | Promise<TOptions>
  | ((env: ConfigEnv) => TOptions | Promise<TOptions>);
