import type { Entries } from 'type-fest';
import { describe, expectTypeOf, it } from 'vitest';
import { entries, keys } from './array';

describe('entries', () => {
  it('should be valid type with object', () => {
    const object = { foo: 1, bar: 2 };
    const entriesArray = entries(object);

    expectTypeOf(entriesArray).toEqualTypeOf<Entries<typeof object>>();
  });

  it('should be valid type with array', () => {
    const array = ['foo', 'bar'] as const;
    const entriesArray = entries(array);

    expectTypeOf(entriesArray).toEqualTypeOf<Entries<typeof array>>();
  });
});

describe('keys', () => {
  it('should be valid type with object', () => {
    const object = { foo: 1, bar: 2 };
    const keysArray = keys(object);

    expectTypeOf(keysArray).toEqualTypeOf<('foo' | 'bar')[]>();
  });
});
