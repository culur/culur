// eslint-disable-next-line antfu/no-import-dist
import { defineConfig } from '../config-vite/dist/index.mjs'; // external import

export default defineConfig({
  test: {
    coverage: {
      excludeExtends: ['src/__tests__/**'],
    },
  },
});
