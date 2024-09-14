import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { expectTypeOf, it } from 'vitest';
import { yamlYarnrcRules } from './yarnrc-yml';

it('should be valid rule', async () => {
  expectTypeOf(yamlYarnrcRules).toEqualTypeOf<TypedFlatConfigItem>();
});
