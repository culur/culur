import type { Packages } from '@culur/utils-packages';
import type { Config } from 'stylelint';

export const configVue = (packages: Partial<Packages>): Config => ({
  extends: [
    packages.sass
      ? 'stylelint-config-standard-vue/scss'
      : 'stylelint-config-standard-vue',
  ],
});
