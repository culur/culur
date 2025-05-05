import { defineConfig } from '@culur/config-vite';

export default defineConfig({
  test: {
    env: {
      NO_COLOR: 'true',
    },
    coverage: {
      excludeExtends: ['scripts/**'],
    },
  },
});
