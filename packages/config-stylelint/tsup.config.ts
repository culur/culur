import { defineConfig, esm_cjs } from '@culur/config-tsup';

export default defineConfig({
  ...esm_cjs,
  entry: ['src/factory.ts', 'src/shareable-configs/*.ts'],
});
