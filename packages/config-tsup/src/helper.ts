import type tsup from 'tsup';

export type Options = ReturnType<(typeof tsup)['defineConfig']>;

export const defineObject =
  <Q>() =>
  <T extends Q>(object: T) =>
    object;

export const defineConfig = <T extends Options>(config: T) =>
  defineObject<T>()(config);
