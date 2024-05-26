import { assert, describe } from 'vitest';
import { configShared } from './shared';
import { testConfigValue } from '~/__tests__';

describe('shared config', () => {
  testConfigValue(configShared, config => {
    assert(Array.isArray(config.extends));
  });
});
