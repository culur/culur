import { defineHasPackages } from './define-has-packages';

export { defineHasPackages } from './define-has-packages';
export type { DefaultPackages as Packages } from './define-has-packages';

export const {
  updateDefaultPackages, //
  hasVue,
  hasSass,
  hasTailwind,
  tailwindVersion,
} = defineHasPackages();
