import { defineHasPackages } from '@culur/utils-packages';
import defineConfig from '~/factory';

const { hasTailwind, hasSass, hasVue } = defineHasPackages();

export default defineConfig({
  tailwind: hasTailwind(),
  sass: hasSass(),
  vue: hasVue(),
});
