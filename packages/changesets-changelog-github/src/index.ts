import type { ChangelogFunctions } from '@changesets/types';
import { config } from 'dotenv';
import { getDependencyReleaseLine } from './get-dependency-release-line';
import { getReleaseLine } from './get-release-line';

config();

const changelogFunctions: ChangelogFunctions = {
  getDependencyReleaseLine,
  getReleaseLine,
};

export default changelogFunctions;
