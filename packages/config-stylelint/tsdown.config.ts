import { defineConfig, esm_cjs } from '@culur/config-tsdown';

export default defineConfig({
  ...esm_cjs,
  entry: [
    'src/factory.ts',
    'src/shareable-configs/*.ts',
    '!src/shareable-configs/*.test.ts',
  ],
});
