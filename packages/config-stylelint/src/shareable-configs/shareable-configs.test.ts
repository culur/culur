import { expectTypeOf, it } from 'vitest';
import type { Config } from 'stylelint';
import autoConfig from './auto';
import noneConfig from './none';
import sassConfig from './sass';
import sassVueConfig from './sass-vue';
import tailwindConfig from './tailwind';
import tailwindSassConfig from './tailwind-sass';
import tailwindSassVueConfig from './tailwind-sass-vue';
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
