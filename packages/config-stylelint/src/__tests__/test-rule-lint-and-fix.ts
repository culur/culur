import stylelint, { Config } from 'stylelint';
import { describe, expect, test } from 'vitest';
import { UtilsPackages, defineMockUtilsPackages } from './mock';

type LintAndFixCase = {
  code: string;
  fixedCode?: string;
  isError?: boolean;
  ext?: 'css' | 'scss' | 'vue';
  debug?: boolean;
} & UtilsPackages;

export const testRuleLintAndFix = (
  getConfig: Config | (() => Config),
  testCases: LintAndFixCase[],
) =>
  describe('Test lint and fix', () => {
    const mockUtilsPackages = defineMockUtilsPackages(testCases);

    const name = [
      ...(['hasTailwind', 'hasSass', 'hasVue', 'isError'] as const) //
        .filter(field => testCases.some(t => typeof t[field] === 'boolean')),
      ...(['code', 'fixedCode'] as const) //
        .filter(field => testCases.some(t => typeof t[field] === 'string')),
    ]
      .map(field => `${field} = $${field}`)
      .join(', ');

    test.each(testCases)(name, async options => {
      await mockUtilsPackages(options);

      const config = typeof getConfig === 'function' ? getConfig() : getConfig;
      const result = await stylelint.lint({
        code: options.code,
        codeFilename: `filename.${options.ext ?? 'css'}`,
        config,
        fix: 'fixedCode' in options,
      });

      if (options.debug) {
        // console.log(result.results);
        console.log(result.results.flatMap(r => r.warnings));
        console.log(result.code);
      }
      if ('fixedCode' in options) expect(result.code).toBe(options.fixedCode);
      if ('isError' in options) expect(result.errored).toBe(options.isError);
    });
  });
