import { resolve } from 'node:path';
import type { Config } from 'stylelint';
import stylelint from 'stylelint';
import type { Awaitable } from 'vitest';
import { describe, expect, it } from 'vitest';
import type { UtilsPackages } from './mock';
import { defineMockUtilsPackages } from './mock';

type LintAndFixCase = {
  code: string;
  fixedCode?: string;
  isError?: boolean;
  ext?: 'css' | 'scss' | 'vue';
  debug?: boolean;
} & UtilsPackages;

export const testLintAndFix = (
  getConfig: Config | (() => Awaitable<Config>),
  testCases: LintAndFixCase[],
) =>
  describe('test lint and fix', () => {
    const mockUtilsPackages = defineMockUtilsPackages(testCases);

    const name = [
      ...(['hasTailwind', 'hasSass', 'hasVue', 'isError'] as const) //
        .filter(field => testCases.some(t => typeof t[field] === 'boolean')),
      ...(['code', 'fixedCode'] as const) //
        .filter(field => testCases.some(t => typeof t[field] === 'string')),
    ]
      .map(field => `${field} = $${field}`)
      .join(', ');

    it.each(testCases)(name, async options => {
      await mockUtilsPackages(options);

      const config =
        typeof getConfig === 'function' ? await getConfig() : getConfig;
      const result = await stylelint.lint({
        code: options.code,
        codeFilename: `filename.${options.ext ?? 'css'}`,
        config,
        fix: 'fixedCode' in options,
        configBasedir: resolve(__dirname, '..'),
      });

      if (options.debug) {
        /* eslint-disable no-console */
        console.log(result.results.flatMap(r => r.warnings));
        console.log(result.code);
        /* eslint-enable no-console */
      }
      if ('fixedCode' in options) expect(result.code).toBe(options.fixedCode);
      if ('isError' in options) expect(result.errored).toBe(options.isError);
    });
  });
