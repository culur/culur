import type { Contact } from './samples/user';
import { assert, beforeAll, describe, expectTypeOf, it, vi } from 'vitest';
import { z } from 'zod';
import { isValidBySchema } from '~/is-valid-by-schema';

describe('is valid by schema', async () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('is valid by schema', async () => {
    const contactSchema = z.object({
      email: z.string(),
      phoneNumber: z.string().optional(),
    });

    const isContact = isValidBySchema<Contact>(contactSchema);

    const validContract: unknown = {
      email: 'abc@def.com',
      phoneNumber: '0123456789',
    };

    assert(isContact(validContract));
    expectTypeOf(validContract).toEqualTypeOf<Contact>();

    const invalidContract: unknown = {};
    assert(!isContact(invalidContract));
    expectTypeOf(invalidContract).not.toEqualTypeOf<Contact>();
  });
});
