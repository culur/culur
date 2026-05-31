import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { expectTypeOf, it } from 'vitest';
import { pnpmWorkspaceYamlRules } from './pnpm-workspace-yaml';

it('should be valid rule', async () => {
  expectTypeOf(pnpmWorkspaceYamlRules).toEqualTypeOf<TypedFlatConfigItem>();
});
