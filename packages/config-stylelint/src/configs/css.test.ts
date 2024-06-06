import { assert } from 'vitest';
import * as utilsPackages from '@culur/utils-packages';
import { configCss } from './css';
import { describeConfig } from '~/__tests__';

describeConfig(utilsPackages, configCss, config => {
  assert(Array.isArray(config.extends));
  assert(Array.isArray(config.plugins));
});
