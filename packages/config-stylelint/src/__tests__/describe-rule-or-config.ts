import type { Packages } from '@culur/utils-packages';
import type { Config, ConfigRuleSettings } from 'stylelint';
import { describe, it } from 'vitest';
import type {
  ConfigRulePrimaryOption,
  ConfigRuleSecondaryOptions,
} from '~/utils';

type Fn<
  TRuleOrConfig extends
    | ConfigRuleSettings<ConfigRulePrimaryOption, ConfigRuleSecondaryOptions>
    | Config,
  TTestCase extends Partial<Packages>,
> = (rule: TRuleOrConfig, testCase: TTestCase) => Promise<void> | void;

function describeRuleOrConfigFactory<
  TBaseRuleOrConfig extends
    | ConfigRuleSettings<ConfigRulePrimaryOption, ConfigRuleSecondaryOptions>
    | Config,
>(describeName: string) {
  return function describeRuleOrConfig<
    TRuleOrConfig extends TBaseRuleOrConfig,
    TTestCase extends Partial<Packages>,
  >(
    getRuleOrConfig:
      | TRuleOrConfig
      | ((
          packages: Partial<Packages>,
        ) => Promise<TRuleOrConfig> | TRuleOrConfig),
    ...args:
      | [testCases: TTestCase[], fn: Fn<TRuleOrConfig, TTestCase>]
      | [fn: Fn<TRuleOrConfig, TTestCase>]
  ) {
    const [testCases, fn] =
      args.length === 2 //
        ? [...args]
        : [[{} as TTestCase], ...args];

    const itName =
      (['tailwind', 'sass', 'vue'] as const)
        .filter(field => testCases.some(t => typeof t[field] === 'boolean'))
        .map(field => `${field} = $${field}`)
        .join(', ') || 'default';

    describe(describeName, () => {
      it.each(testCases)(itName, async testCase => {
        const ruleOrConfig =
          typeof getRuleOrConfig === 'function'
            ? await getRuleOrConfig(testCase)
            : getRuleOrConfig;

        fn(ruleOrConfig, testCase);
      });
    });
  };
}

export const describeConfig = describeRuleOrConfigFactory<Config>('config');
export const describeRule = describeRuleOrConfigFactory<
  ConfigRuleSettings<
    ConfigRulePrimaryOption, //
    ConfigRuleSecondaryOptions
  >
>('rule');
