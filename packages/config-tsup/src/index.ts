import { defineConfig } from './helper';

export { defineConfig } from './helper';

const sharedConfig = defineConfig({
  sourcemap: true,
  clean: true,
  dts: true,
  entry: [
    'src/**/*.ts', //
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
  ],
  treeshake: 'recommended',
});

export const esm = defineConfig({
  ...sharedConfig,
  format: 'esm',
  splitting: true,
});

export const cjs = defineConfig({
  ...sharedConfig,
  format: 'cjs',
});

export const esm_cjs = defineConfig({
  ...sharedConfig,
  format: ['esm', 'cjs'],
  splitting: true,
});
