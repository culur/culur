import type { Options } from 'tsup';
import { defineObject } from '../../../types/src/define-object'; // external import

export const defineConfigPure = defineObject<Options>();

export const defineConfig = defineObject<Options, true>();
