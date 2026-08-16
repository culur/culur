import type { SupportOption } from 'prettier';
import type { PluginOptions } from './prettier.d';

/**
 * Runtime Prettier plugin options configuration.
 *
 * NOTE: TypeScript type augmentation for Prettier's `Options` interface is declared in:
 * @see {@link ./prettier.d.ts}
 */

export const options = {
  classNameThreshold: {
    type: 'int',
    category: 'Format',
    default: 10,
    description:
      'Threshold of class names (split by whitespace) to trigger wrapping.',
  },
  modifierThreshold: {
    type: 'int',
    category: 'Format',
    default: 2,
    description:
      'Threshold of modifier classes within a category before splitting into separate lines.',
  },
  tailwindFunctions: {
    type: 'string',
    array: true,
    category: 'Format',
    default: [{ value: ['cn'] }],
    description:
      'List of custom function names that contain Tailwind CSS class names.',
  },
} satisfies Record<string, SupportOption>;

const JS_IDENTIFIER_REGEX = /^[a-z_$][\w$]*$/i;

/**
 * Validates and resolves plugin options from Prettier runtime options.
 */
export function resolveOptions(opts: unknown): PluginOptions {
  const rawOptions = (opts ?? {}) as Partial<PluginOptions>;

  let tailwindFunctions = ['cn'];
  if (rawOptions.tailwindFunctions !== undefined) {
    if (!Array.isArray(rawOptions.tailwindFunctions)) {
      throw new TypeError(
        'Option "tailwindFunctions" must be an array of strings.',
      );
    }
    if (rawOptions.tailwindFunctions.length > 0) {
      tailwindFunctions = rawOptions.tailwindFunctions;
    }
  }

  for (const fnName of tailwindFunctions) {
    if (typeof fnName !== 'string' || !JS_IDENTIFIER_REGEX.test(fnName)) {
      throw new Error(
        `Option "tailwindFunctions" contains invalid function name "${fnName}". Function names must be valid JS/TS identifiers.`,
      );
    }
  }

  if (rawOptions.classNameThreshold !== undefined) {
    if (
      typeof rawOptions.classNameThreshold !== 'number' ||
      !Number.isInteger(rawOptions.classNameThreshold) ||
      rawOptions.classNameThreshold < 0
    ) {
      throw new Error(
        'Option "classNameThreshold" must be a non-negative integer.',
      );
    }
  }

  if (rawOptions.modifierThreshold !== undefined) {
    if (
      typeof rawOptions.modifierThreshold !== 'number' ||
      !Number.isInteger(rawOptions.modifierThreshold) ||
      rawOptions.modifierThreshold < 0
    ) {
      throw new Error(
        'Option "modifierThreshold" must be a non-negative integer.',
      );
    }
  }

  return {
    classNameThreshold: rawOptions.classNameThreshold ?? 10,
    modifierThreshold: rawOptions.modifierThreshold ?? 2,
    ...rawOptions,
    tailwindFunctions,
  } as PluginOptions;
}
