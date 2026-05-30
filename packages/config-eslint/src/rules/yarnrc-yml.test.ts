import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { expectTypeOf, it } from 'vitest';
import { yarnrcYmlRules } from './yarnrc-yml';

it('should be valid rule', async () => {
  expectTypeOf(yarnrcYmlRules).toEqualTypeOf<TypedFlatConfigItem>();
});
