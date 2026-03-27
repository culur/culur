import { defineConfigPure } from './types';

export { defineConfig } from './types';

const sharedConfig = defineConfigPure({
  sourcemap: true,
  clean: true,
  dts: true,
  entry: [
    'src/**/*.ts', //
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
  ] as const,
  treeshake: true,
});

export const esm = defineConfigPure({
  ...sharedConfig,
  format: 'esm',
});

export const cjs = defineConfigPure({
  ...sharedConfig,
  format: 'cjs',
});

export const esm_cjs = defineConfigPure({
  ...sharedConfig,
  format: ['esm', 'cjs'] as const,
});
