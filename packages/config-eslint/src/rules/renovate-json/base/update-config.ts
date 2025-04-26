import type { JsoncSortKeysOrderMap } from './types';

export const updateConfig = {
  // --- Semantic Versioning Updates ---
  // Based on standard SemVer (MAJOR.MINOR.PATCH) changes.
  semantic_versioning: [
    'major', // T: A change in the MAJOR version number (e.g., 1.x.x -> 2.0.0).
    'minor', // T: A change in the MINOR version number (e.g., 1.2.x -> 1.3.0).
    'patch', // T: A change in the PATCH version number (e.g., 1.2.3 -> 1.2.4).
  ],

  // --- Pinning and Digest Updates ---
  // Used for fixing to exact versions/digests.
  pinning_digests: [
    'pin', // T: Updating from a range to a specific fixed version.
    'digest', // T: Updating the content digest (hash) of a dependency (e.g., Docker image SHA).
    'pinDigest', // T: An update involving both pinning and digest update.
  ],

  // --- Lock File Maintenance ---
  // Updates primarily related to the lock file.
  lock_file: [
    'lockFileMaintenance', // T: Maintenance updates within the lock file without changing direct dependencies.
    'lockfileUpdate', // T: General updates confined to the lock file. (Note: Potential overlap with lockFileMaintenance).
  ],

  // --- Special Update Cases ---
  // Covers less common or non-standard update scenarios.
  special_cases: [
    'rollback', // T: Reverting a dependency to a previous version.
    'bump', // T: A non-specific version increase (e.g., for date-based versions or non-SemVer).
    'replacement', // T: Replacing one dependency with another.
  ],
} as const satisfies JsoncSortKeysOrderMap;
