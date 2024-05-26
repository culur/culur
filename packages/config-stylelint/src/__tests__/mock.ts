import { vi } from 'vitest';

export type UtilsPackages = Partial<{
  hasTailwind: boolean;
  hasSass: boolean;
  hasVue: boolean;
}>;

export const defineMockUtilsPackages = (testCases: UtilsPackages[]) => {
  const shouldMockUtilsPackages = testCases.some(
    t =>
      typeof t.hasTailwind === 'boolean' ||
      typeof t.hasSass === 'boolean' ||
      typeof t.hasVue === 'boolean',
  );

  if (shouldMockUtilsPackages) {
    vi.mock('@culur/utils-packages');
  }

  return async ({ hasTailwind, hasSass, hasVue }: UtilsPackages) => {
    if (shouldMockUtilsPackages) {
      const utilsPackages = await import('@culur/utils-packages');

      if (typeof hasTailwind === 'boolean') {
        utilsPackages.hasTailwind = vi.fn().mockReturnValue(hasTailwind);
      }
      if (typeof hasSass === 'boolean') {
        utilsPackages.hasSass = vi.fn().mockReturnValue(hasSass);
      }
      if (typeof hasVue === 'boolean') {
        utilsPackages.hasVue = vi.fn().mockReturnValue(hasVue);
      }
    }
  };
};
