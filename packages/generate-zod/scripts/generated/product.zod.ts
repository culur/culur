import { z } from 'zod';
import { PermissionLevel, Status } from '~/__tests__/samples/product-enum';
import { isValidAgainstSchema } from '~/is-valid-against-schema';

// Basic enum with string values
export const statusRawSchema = z.enum(Status);

export const isStatusRaw = isValidAgainstSchema<Status>(statusRawSchema);

// Enum without explicitly assigned values (defaults to 0, 1, 2, ...)
export const permissionLevelSchema = z.enum(PermissionLevel);
