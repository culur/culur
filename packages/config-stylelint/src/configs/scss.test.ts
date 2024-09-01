import { assert } from 'vitest';
import { configScss } from './scss';
import { describeConfig } from '~/__tests__';

describeConfig(configScss, config => {
  assert(Array.isArray(config.extends));
});
