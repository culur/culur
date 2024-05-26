import type tsup from 'tsup';
import { defineObject } from '../../types/src'; // external import

export type Options = ReturnType<(typeof tsup)['defineConfig']>;

export const defineConfig = defineObject<Options>();
