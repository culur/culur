import { assert } from 'vitest';
import { describeConfig } from '~/__tests__';
import { configCss } from './css';

describeConfig(configCss, config => {
  assert(Array.isArray(config.extends));
  assert(Array.isArray(config.plugins));
});
