import { assert, describe } from 'vitest';
import { testConfigValue } from '~/__tests__';
import { configVue } from './vue';

describe('Vue config', () => {
  testConfigValue(
    [{ hasSass: true }, { hasSass: false }],
    configVue,
    (config, options) => {
      assert(Array.isArray(config.extends));
      config.extends.includes(
        options.hasSass
          ? 'stylelint-config-standard-vue/scss'
          : 'stylelint-config-standard-vue',
      );
    },
  );
});
