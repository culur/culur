import { assert, describe } from 'vitest';
import { configCss } from './css';
import { testConfigValue } from '~/__tests__';

describe('css config', () => {
  testConfigValue(configCss, config => {
    assert(Array.isArray(config.extends));
    assert(Array.isArray(config.plugins));
  });
});
