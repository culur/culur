import { hasSass } from '@culur/utils-packages';
import type { Config } from 'stylelint';

export const configVue = (): Config => ({
  extends: [
    hasSass()
      ? 'stylelint-config-standard-vue/scss'
      : 'stylelint-config-standard-vue',
  ],
});
