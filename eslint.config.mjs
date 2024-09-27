import defineConfig from '@culur/config-eslint';

export default defineConfig(
  {
    vue: true,
    react: true,
    typescript: true,
  },
  {
    // ignore projects that have custom lint and test scripts
    name: 'projects/ignore',
    ignores: [
      'apps/*/**', //
      'templates/*/**',
    ],
  },
);
