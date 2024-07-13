import { expectTypeOf, it } from 'vitest';
import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { filenameRules } from './filename';

it('should be valid rule', async () => {
  expectTypeOf(filenameRules).toEqualTypeOf<TypedFlatConfigItem>();
});
