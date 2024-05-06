import { assert, describe } from 'vitest';
import { testConfigValue } from '~/__tests__';
import { configScss } from './scss';

describe('SCSS config', () => {
  testConfigValue(configScss, config => {
    assert(Array.isArray(config.extends));
  });
});
