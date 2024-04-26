import { definePrettierConfig } from './packages/config-prettier/dist/factory.mjs';

export default definePrettierConfig({
  plugins: ['prettier-plugin-embed'],
});
