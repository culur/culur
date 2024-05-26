import { assert, describe } from 'vitest';
import { configVue } from './vue';
import { testConfigValue } from '~/__tests__';

describe('vue config', () => {
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
