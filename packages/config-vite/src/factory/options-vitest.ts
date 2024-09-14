import type { BaseCoverageOptions, TypecheckConfig } from 'vitest';
import type { VitestInlineConfig } from '~/types';

export const defineConfigTest = (
  test: boolean | VitestInlineConfig | undefined,
): VitestInlineConfig | undefined => {
  if (test === undefined || test === false) return undefined;
  const { coverage, typecheck, ...testObject } =
    typeof test === 'object' ? test : ({} as VitestInlineConfig);

  const typecheckOptions: Partial<TypecheckConfig> = typecheck ?? {};
  const coverageOptions: BaseCoverageOptions = coverage ?? {};

  return {
    include: ['**/*\\.{test,test-d}.ts'],
    typecheck: {
      tsconfig: './tsconfig.json',
      include: ['**/*.test-d.ts'],
      ...typecheckOptions,
    },
    coverage: {
      enabled: true,
      reporter: ['text', 'html', 'json', 'lcov'],
      ...coverageOptions,
    },
    passWithNoTests: true,
    ...testObject,
  };
};
