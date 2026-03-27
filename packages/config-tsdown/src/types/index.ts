import type { UserConfig } from 'tsdown';
import { defineObjectFactory } from '../../../types/src/define-object-factory'; // external import

export const defineConfigPure = defineObjectFactory<UserConfig>();

export const defineConfig = defineObjectFactory<UserConfig, true>();
