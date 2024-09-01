import { assert } from 'vitest';
import { configShared } from './shared';
import { describeConfig } from '~/__tests__';

describeConfig(configShared, config => {
  assert(Array.isArray(config.extends));
});
