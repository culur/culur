import defineConfig from '@culur/config-eslint';

export default defineConfig(
  {
    vue: false,
    react: false,
    markdown: true,
    typescript: true,
  },
  {
    // ignore rules on markdown
    name: 'projects/ignore-markdown',
    rules: {
      'antfu/no-top-level-await': 'off',
    },
    ignores: ['**/README.md'],
  },
  {
    // ignore projects that have custom lint and test scripts
    name: 'projects/ignore',
    ignores: [
      'apps/*/**', //
      'templates/*/**',
      'packages/logger/**',
      'packages/config-stylelint/**',
    ],
  },
).override('culur/renovate-json/rules', {
  files: [
    '.github/renovate.json5', //
    'packages/renovate/*.json5',
  ],
});
