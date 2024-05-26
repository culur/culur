import { expectTypeOf, it } from 'vitest';
import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { unicornFilenameCase } from './unicorn-filename-case';

it('should be valid rule', async () => {
  expectTypeOf(unicornFilenameCase).toEqualTypeOf<TypedFlatConfigItem>();
});
