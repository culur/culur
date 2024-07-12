import { defineConfig } from '@culur/config-vite';
import { coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['codegen.ts', ...coverageConfigDefaults.exclude],
    },
  },
});
