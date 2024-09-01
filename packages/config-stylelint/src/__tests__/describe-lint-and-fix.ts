import { resolve } from 'node:path';
import type { Config } from 'stylelint';
import type { Packages } from '@culur/utils-packages';
import { describe, expect, it } from 'vitest';
import stylelint from 'stylelint';

type LintAndFixCase = {
  code: string;
  fixedCode?: string;
  isError?: boolean;
  ext?: 'css' | 'scss' | 'vue';
  debug?: boolean;
} & Partial<Packages>;

export function describeLintAndFix<TTestCase extends LintAndFixCase>(
  getConfig: Config | ((testCase: TTestCase) => Promise<Config> | Config),
  testCases: TTestCase[],
) {
  const itName = [
    ...(['tailwind', 'sass', 'vue', 'isError'] as const) //
      .filter(field => testCases.some(t => typeof t[field] === 'boolean')),
    ...(['code', 'fixedCode'] as const) //
      .filter(field => testCases.some(t => typeof t[field] === 'string')),
  ]
    .map(field => `${field} = $${field}`)
    .join(', ');

  describe('test lint and fix', () => {
    it.each(testCases)(itName, async testCase => {
      const config =
        typeof getConfig === 'function' ? await getConfig(testCase) : getConfig;

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
