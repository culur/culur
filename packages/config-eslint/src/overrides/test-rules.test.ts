import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { expectTypeOf, it } from 'vitest';
import { vitestRules } from './test-rules';

it('should be valid rule', async () => {
  expectTypeOf(vitestRules).toEqualTypeOf<TypedFlatConfigItem>();
});
