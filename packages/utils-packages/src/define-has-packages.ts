import { isPackageExists } from 'local-pkg';

export interface Packages {
  tailwind: boolean;
  sass: boolean;
  vue: boolean;
}

export const defineHasPackages = (defaultPackages_: Partial<Packages> = {}) => {
  const defaultPackages: Partial<Packages> = { ...defaultPackages_ };

  const updateDefaultPackages = (packages?: Partial<Packages>) => {
    defaultPackages.tailwind = packages?.tailwind;
    defaultPackages.sass = packages?.sass;
    defaultPackages.vue = packages?.vue;
  };

  const hasSass = () =>
    defaultPackages.sass ??
    ['sass', 'dart-sass', 'node-sass'] //
      .some(pkg => isPackageExists(pkg));

  const hasTailwind = () =>
    defaultPackages.tailwind ?? isPackageExists('tailwindcss');

  const hasVue = () =>
    defaultPackages.vue ??
    ['vue', 'nuxt', 'vitepress'] //
      .some(pkg => isPackageExists(pkg));

  return {
    hasSass,
    hasTailwind,
    hasVue,
    defaultPackages,
    updateDefaultPackages,
  };
};
