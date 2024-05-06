import { assert, describe } from 'vitest';
import { testConfigValue } from '~/__tests__';
import { configShared } from './shared';

describe('Shared config', () => {
  testConfigValue(configShared, config => {
    assert(Array.isArray(config.extends));
  });
});
