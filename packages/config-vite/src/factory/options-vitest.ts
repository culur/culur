import type { BaseCoverageOptions } from 'vitest/node';
import type { VitestInlineConfig, VitestInlineConfigCustom } from '~/types';
import { configDefaults, coverageConfigDefaults } from 'vitest/config';

export const defineConfigTest = (
  test: boolean | VitestInlineConfigCustom | undefined,
): VitestInlineConfig | undefined => {
  if (test === undefined || test === false) return undefined;
  const { coverage, typecheck, ...testObject } =
    typeof test === 'object' ? test : {};

  const { ...typecheckOptions } = typecheck ?? {};
  const { excludeExtends = [], ...coverageOptions } = coverage ?? {};

  return {
    include: ['**/*.{test,test-d}.?(c|m)[jt]s?(x)'],
    exclude: [...configDefaults.exclude, '**/dist/**'],
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json',
      include: ['**/*.test-d.?(c|m)[jt]s?(x)'],
      ...typecheckOptions,
    },
    coverage: {
      enabled: true,
      reporter: ['text', 'html', 'json', 'lcov'],
      exclude: [...coverageConfigDefaults.exclude, ...excludeExtends],
      ...(coverageOptions as BaseCoverageOptions),
    },
    passWithNoTests: true,
    ...testObject,
  };
};
