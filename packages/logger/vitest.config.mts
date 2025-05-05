import { defineConfig } from '@culur/config-vite';

export default defineConfig({
  test: {
    env: {
      NO_COLOR: 'true',
    },
    typecheck: {
      enabled: false,
    },
    coverage: {
      excludeExtends: ['scripts/**'],
    },
  },
});
