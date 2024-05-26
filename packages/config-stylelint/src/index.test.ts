import { describe, expectTypeOf, it } from 'vitest';
import type { Config } from 'stylelint';
import defineConfig from '.';

describe('index', () => {
  it('root config', () => {
    expectTypeOf(defineConfig).toEqualTypeOf<Config>();
  });
});
