// eslint-disable-next-line antfu/no-import-dist
import { defineConfig } from '../config-vite/dist'; // external import

export default defineConfig({
  test: { testTimeout: 20000 },
});
