import type { Linter } from 'eslint';
import type { OverrideConfig } from '~/types';
import vitest from '@vitest/eslint-plugin';

declare module '~/types' {
  export interface ExtraRules {
    // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-title.md
    'test/valid-title': Linter.RuleEntry<
      [
        {
          ignoreTypeOfDescribeName?: boolean;
          allowArguments?: boolean;
          disallowedWords?: string[];
          mustNotMatch?: string[];
          mustMatch?: string[];
        },
      ]
    >;
  }
}

export const testRules: OverrideConfig = {
  name: 'antfu/test/rules',
  partialConfig: {
    // Same `include` in @culur/config-vite
    files: ['**/*\\.{test,test-d}.?(c|m)[jt]s?(x)'],
    rules: {
      ...vitest.configs.recommended.rules,
      'test/valid-title': ['error', { allowArguments: true }],
      'test/expect-expect': [
        'error',
        {
          assertFunctionNames: [
            'expect',
            'expectTypeOf',
            'assert',
            'assertType',
          ],
        },
      ],
    },
  },
};
