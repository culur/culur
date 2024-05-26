import type { Awaitable } from 'vitest';
import { describe, it } from 'vitest';
import type { Config, ConfigRuleSettings } from 'stylelint';
import type { UtilsPackages } from './mock';
import { defineMockUtilsPackages } from './mock';

import type {
  ConfigRulePrimaryOption,
  ConfigRuleSecondaryOptions,
} from '~/utils';

type TArgs<TOptions extends object, TRuleOrConfig> = [
  getRuleOrConfig: (() => Awaitable<TRuleOrConfig>) | TRuleOrConfig,
  fn: (
    ruleOrConfig: TRuleOrConfig,
    options: UtilsPackages & TOptions,
  ) => Promise<void> | void,
];

const testRuleOrConfigValue = <
  TBaseRuleOrConfig extends
    | ConfigRuleSettings<ConfigRulePrimaryOption, ConfigRuleSecondaryOptions>
    | Config,
>(
  ruleOrConfig: 'rule' | 'config',
) => {
  return <
    TCase extends UtilsPackages & object,
    TRuleOrConfig extends TBaseRuleOrConfig,
  >(
    ...args:
      | [testCases: TCase[], ...TArgs<TCase, TRuleOrConfig>]
      | [...TArgs<TCase, TRuleOrConfig>]
  ) => {
    describe(ruleOrConfig, () => {
      const [testCases, getRuleOrConfig, fn] =
        args.length === 3
          ? [...args]
          : [[{} as UtilsPackages & TCase], ...args];

      const mockUtilsPackages = defineMockUtilsPackages(testCases);

      const name = (['hasTailwind', 'hasSass', 'hasVue'] as const)
        .filter(field => testCases.some(t => typeof t[field] === 'boolean'))
        .map(field => `${field} = $${field}`)
        .join(', ');

      it.each(testCases)(name, async options => {
        await mockUtilsPackages(options);

        const ruleOrConfig =
          typeof getRuleOrConfig === 'function'
            ? await getRuleOrConfig()
            : getRuleOrConfig;

        await fn(ruleOrConfig, options);
      });
    });
  };
};

export const testConfigValue = testRuleOrConfigValue<Config>('config');
export const testRuleValue = testRuleOrConfigValue<
  ConfigRuleSettings<
    ConfigRulePrimaryOption, //
    ConfigRuleSecondaryOptions
  >
>('rule');
