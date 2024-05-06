import { describe, expectTypeOf, test } from 'vitest';
import defineConfig from '.';
import { Config } from 'stylelint';

describe('Index', () => {
  test('Root config', () => {
    expectTypeOf(defineConfig).toEqualTypeOf<Config>();
  });
});
