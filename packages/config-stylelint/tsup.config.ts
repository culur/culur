import { cjs, defineConfig } from '@culur/config-tsup';

export default defineConfig({
  ...cjs,
  entry: ['./src/index.ts'],
});
