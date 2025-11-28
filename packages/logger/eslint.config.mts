import defineConfig from '@culur/config-eslint';

export default defineConfig(
  { react: true },
  {
    rules: {
      'prefer-arrow-callback': 'off',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
    },
  },
).overrideRules({
  'vitest/no-standalone-expect': [
    'error',
    {
      additionalTestBlockFunctions: ['describeLogger'],
    },
  ],
});
