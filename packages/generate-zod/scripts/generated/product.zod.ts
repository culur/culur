import { z } from 'zod';
import { PermissionLevel, Status } from '~/__tests__/samples/product-enum';
import { isValidAgainstSchema } from '~/is-valid-against-schema';

// Basic enum with string values
export const statusSchema = z.nativeEnum(Status);

export const isStatus = isValidAgainstSchema<Status>(statusSchema);

// Enum without explicitly assigned values (defaults to 0, 1, 2, ...)
export const permissionLevelSchema = z.nativeEnum(PermissionLevel);
