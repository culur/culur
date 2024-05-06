import { assert, describe } from 'vitest';
import { testConfigValue } from '~/__tests__';
import { configCss } from './css';

describe('CSS config', () => {
  testConfigValue(configCss, config => {
    assert(Array.isArray(config.extends));
    assert(Array.isArray(config.plugins));
  });
});
