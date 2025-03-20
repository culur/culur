import type { Config } from 'stylelint';
import { expectTypeOf, it } from 'vitest';
import autoConfig from './auto';
import noneConfig from './none';
import sassConfig from './sass';
import sassVueConfig from './sass-vue';
import tailwind3Config from './tailwind3';
import tailwind3SassConfig from './tailwind3-sass';
import tailwind3SassVueConfig from './tailwind3-sass-vue';
import tailwind4Config from './tailwind4';
import tailwind4VueConfig from './tailwind4-vue';
import vueConfig from './vue';

it('shareable configs', () => {
  expectTypeOf(autoConfig).toEqualTypeOf<Config>();
  expectTypeOf(noneConfig).toEqualTypeOf<Config>();
  expectTypeOf(sassVueConfig).toEqualTypeOf<Config>();
  expectTypeOf(sassConfig).toEqualTypeOf<Config>();
  expectTypeOf(tailwind3SassVueConfig).toEqualTypeOf<Config>();
  expectTypeOf(tailwind3SassConfig).toEqualTypeOf<Config>();
  expectTypeOf(tailwind3Config).toEqualTypeOf<Config>();
  expectTypeOf(tailwind4Config).toEqualTypeOf<Config>();
  expectTypeOf(tailwind4VueConfig).toEqualTypeOf<Config>();
  expectTypeOf(vueConfig).toEqualTypeOf<Config>();
});
