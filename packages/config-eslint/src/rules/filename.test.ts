import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { expectTypeOf, it } from 'vitest';
import { filenameRules } from './filename';

it('should be valid rule', async () => {
  expectTypeOf(filenameRules).toEqualTypeOf<TypedFlatConfigItem>();
});
