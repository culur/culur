import { describe, expectTypeOf, it } from 'vitest';
import { defineObjectFactory } from './define-object-factory';

describe('defineObject', () => {
  it('auto completion = default = false', () => {
    const object = defineObjectFactory<{
      foo?: string | number;
      bar?: boolean;
    }>()({
      foo: 'foo',
    });

    expectTypeOf(object).toEqualTypeOf<{
      foo: string;
    }>();
  });

  it('auto completion = default = true', () => {
    const object = defineObjectFactory<
      {
        foo?: string | number;
        bar?: boolean;
      },
      true
    >()({
      foo: 'foo',
    });

    expectTypeOf(object).toEqualTypeOf<
      | { foo?: string | number; bar?: boolean } //
      | { foo: string }
    >();
  });
});
