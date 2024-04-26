import stylelint, { Config } from 'stylelint';
import { describe, test } from 'vitest';
import { UtilsPackages, defineMockUtilsPackages } from './mock';

export const testConfig = <TOptions extends object, TConfig extends Config>(
  ...args:
    | [
        testCases: (UtilsPackages & TOptions)[],
        getConfig: TConfig | (() => TConfig),
        fn: (
          config: TConfig,
          options: UtilsPackages & TOptions,
        ) => Promise<void> | void,
      ]
    | [
        getConfig: TConfig | (() => TConfig),
        fn: (
          config: TConfig,
          options: UtilsPackages & TOptions,
        ) => Promise<void> | void,
      ]
) => {
  describe('Test config', () => {
    const [testCases, getConfig, fn] =
      args.length === 3 //
        ? [...args]
        : [[{} as UtilsPackages & TOptions], ...args];

    const mockUtilsPackages = defineMockUtilsPackages(testCases);

    const name = (['hasTailwind', 'hasSass', 'hasVue'] as const)
      .filter(field => testCases.some(t => typeof t[field] === 'boolean'))
      .map(field => `${field} = $${field}`)
      .join(', ');

    test.each(testCases)(name, async options => {
      await mockUtilsPackages(options);

      const config = typeof getConfig === 'function' ? getConfig() : getConfig;

      fn(config, options);
    });
  });
};
