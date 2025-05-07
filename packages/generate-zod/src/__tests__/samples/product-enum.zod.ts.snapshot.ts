import { z } from 'zod';
import { PermissionLevel, Status } from './product-enum';

// Basic enum with string values
export const statusSchema = z.nativeEnum(Status);

// Enum without explicitly assigned values (defaults to 0, 1, 2, ...)
export const permissionLevelSchema = z.nativeEnum(PermissionLevel);
