import { describe, test } from 'vitest';
import { UtilsPackages, defineMockUtilsPackages } from './mock';
import { ConfigRuleSettings } from 'stylelint';

export const testRuleValue = <
  TOptions extends object,
  T,
  O extends object,
  TRule extends ConfigRuleSettings<T, O>,
>(
  ...args:
    | [
        testCases: (UtilsPackages & TOptions)[],
        getRule: (() => TRule) | TRule,
        fn: (
          rule: TRule,
          options: UtilsPackages & TOptions,
        ) => Promise<void> | void,
      ]
    | [
        getRule: (() => TRule) | TRule,
        fn: (
          rule: TRule,
          options: UtilsPackages & TOptions,
        ) => Promise<void> | void,
      ]
) => {
  describe('Valid rule', () => {
    const [testCases, getRule, fn] =
      args.length === 3
        ? [...args]
        : [[{} as UtilsPackages & TOptions], ...args];

    const mockUtilsPackages = defineMockUtilsPackages(testCases);

    const name = (['hasTailwind', 'hasSass', 'hasVue'] as const)
      .filter(field => testCases.some(t => typeof t[field] === 'boolean'))
      .map(field => `${field} = $${field}`)
      .join(', ');

    test.each(testCases)(name, async options => {
      await mockUtilsPackages(options);

      const rule = typeof getRule === 'function' ? getRule() : getRule;

      fn(rule, options);
    });
  });
};
