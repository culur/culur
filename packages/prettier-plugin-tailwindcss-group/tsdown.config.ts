import path from 'node:path';
import { defineConfig, esm } from '@culur/config-tsdown';

export default defineConfig({
  ...esm,
  entry: ['src/index.ts'],
  alias: {
    'tailwind-merge-ts': path.resolve(
      import.meta.dirname,
      'node_modules/tailwind-merge/src',
    ),
  },
  deps: {
    alwaysBundle: ['tailwind-merge', 'tailwind-merge-ts'],
  },
});
