import { describe, expectTypeOf, it } from 'vitest';
import type { PackageJson } from './package-json';

describe('packageJson', () => {
  it('should be valid type', () => {
    expectTypeOf<NonNullable<PackageJson['volta']>>().toMatchTypeOf<{
      [EngineName in 'node' | 'npm' | 'pnpm' | 'yarn' | string]?: string;
    }>();
  });
});
