import { getPackageInfoSync, isPackageExists } from 'local-pkg';
import semver from 'semver';

export interface DefaultPackages {
  tailwind: false | number;
  sass: boolean;
  vue: boolean;
}

export const defineHasPackages = (
  defaultPackages_: Partial<DefaultPackages> = {},
) => {
  const defaultPackages: Partial<DefaultPackages> = { ...defaultPackages_ };

  const updateDefaultPackages = (packages?: Partial<DefaultPackages>) => {
    defaultPackages.tailwind = packages?.tailwind;
    defaultPackages.sass = packages?.sass;
    defaultPackages.vue = packages?.vue;
  };

  const hasVue = () =>
    defaultPackages.vue ??
    ['vue', 'nuxt', 'vitepress', '@slidev/cli'] //
      .some(pkg => isPackageExists(pkg));

  const hasSass = () =>
    defaultPackages.sass ??
    ['sass', 'dart-sass', 'node-sass'] //
      .some(pkg => isPackageExists(pkg));

  const hasTailwind = () => {
    const { tailwind } = defaultPackages;
    if (typeof tailwind === 'number') return true;
    if (tailwind === false) return false;

    return isPackageExists('tailwindcss');
  };

  const tailwindVersion = () => {
    const { tailwind } = defaultPackages;
    if (typeof tailwind === 'number') return tailwind;
    if (tailwind === false) return false;

    const packageTailwind = getPackageInfoSync('tailwindcss');
    if (!packageTailwind?.version) return false;

    return semver.major(packageTailwind.version, { loose: true });
  };

  return {
    hasVue,
    hasSass,
    hasTailwind,
    tailwindVersion,
    defaultPackages,
    updateDefaultPackages,
  };
};
