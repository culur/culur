import type { Options } from 'prettier';

/**
 * Ambient type augmentation for Prettier Options.
 *
 * NOTE: These type definitions correspond directly to the runtime options defined in:
 * @see {@link ./options.ts}
 */
declare module 'prettier' {
  interface Options {
    classNameThreshold?: number;
    modifierThreshold?: number;
    tailwindFunctions?: string[];
  }
}

export interface PluginOptions extends Options {
  classNameThreshold: number;
  modifierThreshold: number;
  tailwindFunctions: string[];
}
