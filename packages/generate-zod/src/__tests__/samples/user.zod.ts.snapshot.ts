import { z } from 'zod';

const addressSchema = z.object({
  street: z.string(),
  wardCommune: z.string(),
  district: z.string(),
  cityProvince: z.string(),
});

// Type for contact information
export const contactSchema = z.object({
  email: z.string(),
  phoneNumber: z.string().optional(),
});

// Union of different object interfaces using & for intersection
export const userUnionSchema = z
  .object({
    fullName: z.string(),
  })
  .and(
    z.union([
      z.object({
        type: z.literal('customer'),
        shippingAddress: addressSchema,
      }),
      z.object({
        type: z.literal('employee'),
        department: z.string(),
      }),
      z.object({
        type: z.literal('partner'),
        contactDetails: contactSchema,
      }),
    ]),
  );
