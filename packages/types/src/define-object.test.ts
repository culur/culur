import { describe, expectTypeOf, it } from 'vitest';
import { defineObject } from './define-object';

describe('defineObject', () => {
  it('auto completion = default = false', () => {
    const object = defineObject<{
      foo?: string | number;
      bar?: boolean;
    }>()({
      foo: 'foo',
    });

    expectTypeOf(object).toMatchTypeOf<{
      foo: string;
    }>();
  });

  it('auto completion = default = true', () => {
    const object = defineObject<
      {
        foo?: string | number;
        bar?: boolean;
      },
      true
    >()({
      foo: 'foo',
    });

    expectTypeOf(object).toMatchTypeOf<
      | { foo?: string | number; bar?: boolean } //
      | { foo: string }
    >();
  });
});
