import type { ZodType } from 'zod';

export function isValidAgainstSchema<T>(schema: ZodType) {
  return function (value: any, debug = false): value is T {
    try {
      schema.parse(value);
      return true;
    } catch (error) {
      if (debug) console.error('Schema validation failed.', error);
      return false;
    }
  };
}
