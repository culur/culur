import { resolve } from 'node:path';
import type { Awaitable } from 'vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Config } from 'stylelint';
import stylelint from 'stylelint';
import type { UtilsPackages } from './mock';
import { spyOnUtilsPackages } from './spy-on-utils-packages';

type LintAndFixCase = {
  code: string;
  fixedCode?: string;
  isError?: boolean;
  ext?: 'css' | 'scss' | 'vue';
  debug?: boolean;
} & UtilsPackages;

export function describeLintAndFix(
  utilsPackages: typeof import('@culur/utils-packages'),
  getConfig: Config | (() => Awaitable<Config>),
  testCases: LintAndFixCase[],
) {
  const itName = [
    ...(['hasTailwind', 'hasSass', 'hasVue', 'isError'] as const) //
      .filter(field => testCases.some(t => typeof t[field] === 'boolean')),
    ...(['code', 'fixedCode'] as const) //
      .filter(field => testCases.some(t => typeof t[field] === 'string')),
  ]
    .map(field => `${field} = $${field}`)
    .join(', ');

  describe('test lint and fix', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it.each(testCases)(itName, async testCase => {
      spyOnUtilsPackages(utilsPackages, testCase);

      const config =
        typeof getConfig === 'function' ? await getConfig() : getConfig;

      const result = await stylelint.lint({
        code: testCase.code,
        codeFilename: `filename.${testCase.ext ?? 'css'}`,
        config,
        fix: 'fixedCode' in testCase,
        configBasedir: resolve(__dirname, '..'),
      });

      if (testCase.debug) {
        /* eslint-disable no-console */
        console.log(JSON.stringify(config, undefined, 2));
        console.log(result.results.flatMap(r => r.warnings));
        console.log(result.code);
        /* eslint-enable no-console */
      }
      if ('fixedCode' in testCase) expect(result.code).toBe(testCase.fixedCode);
      if ('isError' in testCase) expect(result.errored).toBe(testCase.isError);
    });
  });
}
