import type { PackageJsonExtends } from './package-json';
import { describe, expectTypeOf, it } from 'vitest';

describe('packageJson', () => {
  it('should be valid type', () => {
    expectTypeOf<NonNullable<PackageJsonExtends['volta']>>().toEqualTypeOf<{
      [EngineName in 'node' | 'npm' | 'pnpm' | 'yarn' | string]?: string;
    }>();
  });
});
