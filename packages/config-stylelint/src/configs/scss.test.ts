import { assert } from 'vitest';
import { describeConfig } from '~/__tests__';
import { configScss } from './scss';

describeConfig(configScss, config => {
  assert(Array.isArray(config.extends));
});
