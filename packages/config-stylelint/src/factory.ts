import type { Packages } from '@culur/utils-packages';
import type { Config } from 'stylelint';
import { configCss } from './configs/css';
import { configScss } from './configs/scss';
import { configShared } from './configs/shared';
import { configVue } from './configs/vue';
import { mergeConfigs } from './utils';

export default function defineConfig(
  packages?: Partial<Packages>,
  config?: Config,
): Config {
  const packages_ = packages ?? {};

  return mergeConfigs(
    configShared(),
    configCss(packages_),
    packages_.sass && configScss(packages_),
    packages_.vue && configVue(packages_),
    config,
  );
}
