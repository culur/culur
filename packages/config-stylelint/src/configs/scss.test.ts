import { assert, describe } from 'vitest';
import { configScss } from './scss';
import { testConfigValue } from '~/__tests__';

describe('scss config', () => {
  testConfigValue(configScss, config => {
    assert(Array.isArray(config.extends));
  });
});
