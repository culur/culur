import type { OverrideConfig } from '~/types';
import { expectTypeOf, it } from 'vitest';
import { testRules } from './test-rules';

it('should be valid rule', async () => {
  expectTypeOf(testRules).toEqualTypeOf<OverrideConfig>();
});
