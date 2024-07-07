import type { ChangelogFunctions } from '@changesets/types';
import { config } from 'dotenv';
import { getReleaseLine } from './get-release-line';
import { getDependencyReleaseLine } from './get-dependency-release-line';

config();

const changelogFunctions: ChangelogFunctions = {
  getDependencyReleaseLine,
  getReleaseLine,
};

export default changelogFunctions;
