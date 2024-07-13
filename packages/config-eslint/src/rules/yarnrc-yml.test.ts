import { expectTypeOf, it } from 'vitest';
import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { yamlYarnrcRules } from './yarnrc-yml';

it('should be valid rule', async () => {
  expectTypeOf(yamlYarnrcRules).toEqualTypeOf<TypedFlatConfigItem>();
});
