import type { VitestInlineConfig } from '~/types';

export const defineConfigTest = (
  test: boolean | VitestInlineConfig | undefined,
): VitestInlineConfig | undefined => {
  if (test === undefined || test === false) return undefined;
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
