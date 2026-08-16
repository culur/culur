import defineConfig from '@culur/config-prettier/factory';

export default defineConfig({
  plugins: ['prettier-plugin-embed', 'prettier-plugin-multiline-arrays'],
  overrides: [
    {
      files: 'src/__tests__/**/*.ts',
      options: {
        printWidth: 80 + 6,
      },
    },
  ],
});
