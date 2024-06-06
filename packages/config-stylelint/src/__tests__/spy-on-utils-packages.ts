import { vi } from 'vitest';
import type { UtilsPackages } from './mock';

export const hasValues = ['hasTailwind', 'hasSass', 'hasVue'] as const;

export function spyOnUtilsPackages(
  utilsPackages: typeof import('@culur/utils-packages'),
  options: UtilsPackages,
) {
  for (const hasValue of hasValues) {
    const value = options[hasValue] ?? false;
    vi.spyOn(utilsPackages, hasValue).mockReturnValue(value);
  }
}
