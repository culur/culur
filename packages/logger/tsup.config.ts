import { defineConfig, esm } from '@culur/config-tsup';

export default defineConfig({
  ...esm,
  entry: ['src/index.ts'],
});
