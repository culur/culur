import { assert } from 'vitest';
import { describeConfig } from '~/__tests__';
import { configVue } from './vue';

describeConfig(
  configVue,
  [{ sass: true }, { sass: false }],
  (config, testCase) => {
    assert(Array.isArray(config.extends));
    assert(Array.isArray(config.extends));
    config.extends.includes(
      testCase.sass
        ? 'stylelint-config-standard-vue/scss'
        : 'stylelint-config-standard-vue',
    );
  },
);
