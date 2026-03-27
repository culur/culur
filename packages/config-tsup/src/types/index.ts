import type { Options } from 'tsup';
import { defineObjectFactory } from '../../../types/src/define-object-factory'; // external import

export const defineConfigPure = defineObjectFactory<Options>();

export const defineConfig = defineObjectFactory<Options, true>();
