import { UserConfig as UserConfigVite } from 'vite';
import { test, expectTypeOf } from 'vitest';
import { UserConfig as UserConfigVitest } from 'vitest/config';
import config from '.';

test('Index config', () => {
  expectTypeOf(config).toEqualTypeOf<UserConfigVite | UserConfigVitest>();
});
