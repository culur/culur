import * as utilsPackages from '@culur/utils-packages';
import { assert } from 'vitest';
import { configScss } from './scss';
import { describeConfig } from '~/__tests__';

describeConfig(utilsPackages, configScss, config => {
  assert(Array.isArray(config.extends));
});
