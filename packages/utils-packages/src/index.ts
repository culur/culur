import { defineHasPackages } from './define-has-packages';

export { defineHasPackages, Packages } from './define-has-packages';

export const {
  updateDefaultPackages, //
  hasSass,
  hasTailwind,
  hasVue,
} = defineHasPackages();
