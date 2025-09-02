// eslint-disable-next-line antfu/no-import-dist
import { defineConfig } from '../config-vite/dist'; // external import

export default defineConfig({
  test: {
    env: {
      NO_COLOR: 'true',
    },
    coverage: {
      excludeExtends: ['scripts/**'],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
