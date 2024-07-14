import type { OverrideConfig } from '~/types';

export const vueRules: OverrideConfig = {
  name: 'antfu/vue/rules',
  partialConfig: {
    rules: {
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
    },
  },
};
