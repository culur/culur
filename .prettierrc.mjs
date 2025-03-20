import defineConfig from '@culur/config-prettier/factory';

export default defineConfig({
  plugins: ['prettier-plugin-embed'],
  overrides: [
    {
      files: 'packages/config-stylelint/src/rules/order.ts',
      options: {
        printWidth: 120,
      },
    },
  ],
});
