import { assert } from 'vitest';
import { configCss } from './css';
import { describeConfig } from '~/__tests__';

describeConfig(configCss, config => {
  assert(Array.isArray(config.extends));
  assert(Array.isArray(config.plugins));
});
