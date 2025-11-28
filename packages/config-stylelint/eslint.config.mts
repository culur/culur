import defineConfig from '@culur/config-eslint';

export default defineConfig().overrideRules({
  'vitest/no-standalone-expect': [
    'error',
    {
      additionalTestBlockFunctions: ['describeRule'],
    },
  ],
});
