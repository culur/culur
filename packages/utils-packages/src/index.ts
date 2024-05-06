import { defineHasPackages } from './defineHasPackages';

export { Packages, defineHasPackages } from './defineHasPackages';

export const {
  defaultPackages,
  updateDefaultPackages,
  hasSass, //
  hasTailwind,
  hasVue,
} = defineHasPackages();
