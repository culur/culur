import { assert } from 'vitest';
import { describeConfig } from '~/__tests__';
import { configShared } from './shared';

describeConfig(configShared, config => {
  assert(Array.isArray(config.extends));
});
