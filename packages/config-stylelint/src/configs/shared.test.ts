import { assert } from 'vitest';
import * as utilsPackages from '@culur/utils-packages';
import { configShared } from './shared';
import { describeConfig } from '~/__tests__';

describeConfig(utilsPackages, configShared, config => {
  assert(Array.isArray(config.extends));
});
