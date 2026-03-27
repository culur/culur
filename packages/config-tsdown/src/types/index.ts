import type { UserConfig } from 'tsdown';
import { defineObject } from '../../../types/src/define-object'; // external import

export const defineConfigPure = defineObject<UserConfig>();

export const defineConfig = defineObject<UserConfig, true>();
