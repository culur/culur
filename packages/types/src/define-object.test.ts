import { describe, expectTypeOf, it } from 'vitest';
import { defineObject } from './define-object';

describe('defineObject', () => {
  it('should be valid type', () => {
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
});
