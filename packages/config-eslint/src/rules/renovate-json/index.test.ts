import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { expectTypeOf, it } from 'vitest';
import { renovateJsonRules } from '.';

it('should be valid rule', async () => {
  expectTypeOf(renovateJsonRules).toEqualTypeOf<TypedFlatConfigItem>();
});
