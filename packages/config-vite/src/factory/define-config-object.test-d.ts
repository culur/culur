import type { ViteUserConfig } from 'vitest/config';
import { describe, expectTypeOf, it } from 'vitest';
import { defineConfigObject } from './define-config-object';

describe('defineConfigSync', () => {
  it('default', () => {
    const config = defineConfigObject();
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });

  it('vite', () => {
    const config = defineConfigObject({ test: false });
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });

  it('vitest', () => {
    const config = defineConfigObject({ test: true });
    expectTypeOf(config).toEqualTypeOf<ViteUserConfig>();
  });
});
