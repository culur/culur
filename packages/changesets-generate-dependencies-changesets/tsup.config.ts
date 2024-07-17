import { esm_cjs } from '@culur/config-tsup';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...esm_cjs,
  entry: ['src/index.ts'],
});
