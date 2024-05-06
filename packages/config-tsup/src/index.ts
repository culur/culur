import { defineConfig } from './helper';

export { defineConfig } from './helper';

const sharedConfig = defineConfig({
  sourcemap: true,
  clean: true,
  dts: { resolve: true },
  entry: ['src/*'],
});

export const esm = defineConfig({
  ...sharedConfig,
  format: 'esm',
  splitting: true,
  treeshake: 'recommended',
});

export const cjs = defineConfig({
  ...sharedConfig,
  format: 'cjs',
  treeshake: 'recommended',
});

export const esm_cjs = defineConfig({
  ...sharedConfig,
  format: ['esm', 'cjs'],
  splitting: true,
  treeshake: 'recommended',
});
