import type { Packages } from '@culur/utils-packages';
import { hasSass, hasVue, updateDefaultPackages } from '@culur/utils-packages';
import type { Config } from 'stylelint';
import { configCss } from './configs/css';
import { configScss } from './configs/scss';
import { configShared } from './configs/shared';
import { configVue } from './configs/vue';
import { mergeConfigs } from './utils';

export default function defineConfig(
  options?: Partial<Packages>,
  config?: Config,
): Config {
  updateDefaultPackages(options);

  return mergeConfigs(
    configShared(),
    configCss(),
    hasSass() && configScss(),
    hasVue() && configVue(),
    config,
  );
}
