import { assert } from 'vitest';
import * as utilsPackages from '@culur/utils-packages';
import { configVue } from './vue';
import { describeConfig } from '~/__tests__';

describeConfig(
  utilsPackages,
  configVue,
  [{ hasSass: true }, { hasSass: false }],
  (config, testCase) => {
    assert(Array.isArray(config.extends));
    assert(Array.isArray(config.extends));
    config.extends.includes(
      testCase.hasSass
        ? 'stylelint-config-standard-vue/scss'
        : 'stylelint-config-standard-vue',
    );
  },
);
