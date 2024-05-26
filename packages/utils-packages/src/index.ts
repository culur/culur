import { defineHasPackages } from './define-has-packages';

export { Packages, defineHasPackages } from './define-has-packages';

export const {
  updateDefaultPackages, //
  hasSass,
  hasTailwind,
  hasVue,
} = defineHasPackages();
