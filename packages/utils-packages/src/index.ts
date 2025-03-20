import { defineHasPackages } from './define-has-packages';

export {
  defineHasPackages,
  DefaultPackages as Packages,
} from './define-has-packages';

export const {
  updateDefaultPackages, //
  hasVue,
  hasSass,
  hasTailwind,
  tailwindVersion,
} = defineHasPackages();
