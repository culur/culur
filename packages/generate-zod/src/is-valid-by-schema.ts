import type { ZodType } from 'zod';

export function isValidBySchema<T>(schema: ZodType) {
  return function (value: any): value is T {
    try {
      schema.parse(value);
      return true;
    } catch (error) {
      console.error('Invalid storage, use default', error);
      return false;
    }
  };
}
