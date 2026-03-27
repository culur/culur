import type { Config, ConfigRuleSettings } from 'stylelint';

// import type Primary, Secondary from stylelint

type StringOrRegex = string | RegExp;
type OneOrMany<S> = S | S[];

export type Primary =
  | number
  | true
  | OneOrMany<StringOrRegex>
  | Record<string, any>;
export type Secondary = Record<string, any>;

export const defineRule = <
  PrimaryOption extends Primary,
  SecondaryOptions extends Secondary = object,
>(
  rule: ConfigRuleSettings<PrimaryOption, SecondaryOptions>,
) => rule;

export const defineRules = <TRules extends Config['rules']>(rule: TRules) =>
  rule;

// clone function mergeConfigs from stylelint repository
export const mergeConfigs = (
  ...configsOrNull: (Config | undefined | null | false)[]
) => {
  const configs = configsOrNull.filter((c): c is Config => !!c);

  return {
    plugins: [...new Set(configs.flatMap(c => c.plugins ?? []))],
    overrides: [...new Set(configs.flatMap(c => c.overrides ?? []))],
    extends: configs
      .flatMap(c => c.extends ?? [])
      .filter((item, index, arr) => arr.lastIndexOf(item) === index),
    rules: configs.reduce(
      (acc, config) => ({ ...acc, ...config.rules }),
      {} as Config['rules'],
    ),
    ...configs.reduce(
      (
        acc,
        { plugins: _p, overrides: _o, extends: _e, rules: _r, ...config },
      ) => ({ ...acc, ...config }),
      {} as Config,
    ),
  };
};

export const isInRange = (
  version: false | number | undefined,
  ...versions: number[]
) => typeof version === 'number' && versions.includes(version);
