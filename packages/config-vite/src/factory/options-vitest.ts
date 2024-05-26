import type { UserConfig as UserConfigVitest } from 'vitest/config';

export const defineConfigTest = (
  test: true | UserConfigVitest['test'],
): UserConfigVitest['test'] => {
  if (test === undefined) return undefined;
  return {
    include: ['**/*\\.{test,test-d}.ts'],
    typecheck: {
      tsconfig: './tsconfig.json',
      include: ['**/*.test-d.ts'],
    },
    coverage: {
      enabled: true,
      reporter: ['text', 'html', 'json'],
    },
    ...(typeof test === 'object' ? test : {}),
  };
};
