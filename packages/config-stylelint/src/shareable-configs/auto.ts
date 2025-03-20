import { defineHasPackages } from '@culur/utils-packages';
import defineConfig from '~/factory';

const { tailwindVersion, hasSass, hasVue } = defineHasPackages();

export default defineConfig({
  tailwind: tailwindVersion(),
  sass: hasSass(),
  vue: hasVue(),
});
