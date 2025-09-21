import type { ChangelogFunctions } from '@changesets/types';
import { expectTypeOf, it } from 'vitest';
import changelogFunctions from '.';

it('index', () => {
  expectTypeOf(changelogFunctions).toEqualTypeOf<ChangelogFunctions>();
});
