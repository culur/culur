import { expectTypeOf, it } from 'vitest';
import type { Config } from 'stylelint';
import autoConfig from './auto';
import noneConfig from './none';
import sassVueConfig from './sass-vue';
import sassConfig from './sass';
import tailwindSassVueConfig from './tailwind-sass-vue';
import tailwindSassConfig from './tailwind-sass';
import tailwindConfig from './tailwind';
import vueConfig from './vue';

it('shareable configs', () => {
  expectTypeOf(autoConfig).toEqualTypeOf<Config>();
  expectTypeOf(noneConfig).toEqualTypeOf<Config>();
  expectTypeOf(sassVueConfig).toEqualTypeOf<Config>();
  expectTypeOf(sassConfig).toEqualTypeOf<Config>();
  expectTypeOf(tailwindSassVueConfig).toEqualTypeOf<Config>();
  expectTypeOf(tailwindSassConfig).toEqualTypeOf<Config>();
  expectTypeOf(tailwindConfig).toEqualTypeOf<Config>();
  expectTypeOf(vueConfig).toEqualTypeOf<Config>();
});
