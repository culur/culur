import { coverageConfigDefaults } from 'vitest/config';
// eslint-disable-next-line antfu/no-import-dist
import { defineConfig } from '../config-vite/dist'; // external import

export default defineConfig({
  test: {
    coverage: {
      exclude: ['codegen.ts', ...coverageConfigDefaults.exclude],
    },
  },
});
