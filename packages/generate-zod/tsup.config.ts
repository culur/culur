import { defineConfig, esm_cjs } from '@culur/config-tsup';

export default defineConfig({
  ...esm_cjs,
  entry: ['src/index.ts', 'src/is-valid-against-schema.ts'],
});
