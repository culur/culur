import { expectTypeOf, it } from 'vitest';
import type { ChangelogFunctions } from '@changesets/types';
import changelogFunctions from '.';

it('index', () => {
  expectTypeOf(changelogFunctions).toMatchTypeOf<ChangelogFunctions>();
});
