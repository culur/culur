import type { Awaitable } from 'vitest';
import { afterEach, describe, it, vi } from 'vitest';
import type { Config, ConfigRuleSettings } from 'stylelint';
import type { UtilsPackages } from './mock';
import { hasValues, spyOnUtilsPackages } from './spy-on-utils-packages';
import type {
  ConfigRulePrimaryOption,
  ConfigRuleSecondaryOptions,
} from '~/utils';

type Fn<
  TTestCase extends UtilsPackages & object,
  TRuleOrConfig extends
    | ConfigRuleSettings<ConfigRulePrimaryOption, ConfigRuleSecondaryOptions>
    | Config,
> = (
  ruleOrConfig: TRuleOrConfig,
  options: UtilsPackages & TTestCase,
) => Promise<void> | void;

export function describeRuleOrConfigFactory<
  TBaseRuleOrConfig extends
    | ConfigRuleSettings<ConfigRulePrimaryOption, ConfigRuleSecondaryOptions>
    | Config,
>(describeName: string) {
  function describeRuleOrConfig<
    TRuleOrConfig extends TBaseRuleOrConfig,
    TTestCase extends UtilsPackages & object,
  >(
    utilsPackages: typeof import('@culur/utils-packages'),
    getRuleOrConfig: (() => Awaitable<TRuleOrConfig>) | TRuleOrConfig,
    ...args:
      | [testCases: TTestCase[], fn: Fn<TTestCase, TRuleOrConfig>]
      | [fn: Fn<TTestCase, TRuleOrConfig>]
  ) {
    const [testCases, fn] =
      args.length === 2 //
        ? [...args]
        : [[{} as UtilsPackages & TTestCase], ...args];

    const itName =
      hasValues
        .filter(field => testCases.some(t => typeof t[field] === 'boolean'))
        .map(field => `${field} = $${field}`)
        .join(', ') || 'default';

    describe(describeName, () => {
      afterEach(() => {
        vi.restoreAllMocks();
      });

      it.each(testCases)(itName, async testCase => {
        spyOnUtilsPackages(utilsPackages, testCase);

        const ruleOrConfig =
          typeof getRuleOrConfig === 'function'
            ? await getRuleOrConfig()
            : getRuleOrConfig;

        fn(ruleOrConfig, testCase);
      });
    });
  }

  return describeRuleOrConfig;
}
export const describeConfig = describeRuleOrConfigFactory<Config>('config');
export const describeRule = describeRuleOrConfigFactory<
  ConfigRuleSettings<
    ConfigRulePrimaryOption, //
    ConfigRuleSecondaryOptions
  >
>('rule');
