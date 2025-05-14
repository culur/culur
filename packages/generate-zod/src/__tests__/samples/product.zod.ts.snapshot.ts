import type { DetailedProduct } from './product';
import { z } from 'zod';
import { isValidAgainstSchema } from '~/is-valid-against-schema';
import { permissionLevelSchema, statusSchema } from './product-enum.zod';

const paymentMethodSchema = z.union([
  z.literal('cash'),
  z.literal('credit_card'),
  z.literal('bank_transfer'),
]);

// Basic interface with various primitive data types
export const basicProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  isSold: z.boolean(),
  createdAt: z.date(),
  status: statusSchema,
  permission: permissionLevelSchema.optional(),
});

// Interface inheritance (extends) from BasicProduct
export const detailedProductSchema = basicProductSchema.extend({
  description: z.string().optional(),
  dimensions: z.union([
    z.string(),
    z.object({
      length: z.number(),
      width: z.number(),
    }),
  ]),
  acceptedPaymentMethods: z.array(paymentMethodSchema).optional(),
});

export const isDetailedProduct = isValidAgainstSchema<DetailedProduct>(
  detailedProductSchema,
);

// Using Partial to create a type with all optional properties
export const optionalBasicProductSchema = basicProductSchema.partial();

// Using Required to create a type with all required properties (in case of previous Partial)
export const requiredDetailedProductSchema = detailedProductSchema.required();
