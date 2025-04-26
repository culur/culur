import type { JsoncSortKeysOrderMap } from './types';

export const assigneesAndReviewersConfig = {
  // --- Assignees ---
  assignees: [
    'assignees', // string[]: Explicit list of usernames to assign to the PR.
    'assigneesFromCodeOwners', // boolean: Assign users listed as owners in the CODEOWNERS file.
    'assigneesSampleSize', // number: Select a random sample of this size from the potential assignees (either from `assignees` list or CODEOWNERS). [1]
  ],

  // --- Reviewers ---
  reviewers: [
    'reviewers', // string[]: Explicit list of usernames to request reviews from.
    'reviewersFromCodeOwners', // boolean: Request reviews from users listed as owners in the CODEOWNERS file.
    'reviewersSampleSize', // number: Select a random sample of this size from the potential reviewers (either from `reviewers` list or CODEOWNERS).
    'additionalReviewers', // string[]: Add these users as reviewers *in addition* to any specified in `reviewers` or derived from CODEOWNERS. Useful for adding specific reviewers in package rules without overriding the base list. [14]
    'ignoreReviewers', // string[]: List of usernames that should *not* be added as reviewers, even if they are in the `reviewers` list or CODEOWNERS. Useful for filtering out bots or users on leave. [2]
  ],

  // --- Common / Helper Options ---
  common: [
    'expandCodeOwnersGroups', // boolean: If true, Renovate expands CODEOWNERS groups (like `@org/team`) into individual members before applying logic like `reviewersSampleSize`. Supported on GitLab [3, 4, 6] and potentially other platforms supporting group expansion [1].
    'filterUnavailableUsers', // boolean: (Note: Supported on GitLab [3, 5]) Check if assigned/requested users are actually available/have access on the platform before adding them. [3, 5, 8, 12, 13] Prevents errors if a listed user doesn't exist or can't access the repository.
    // 'assignAutomerge',       // boolean: (Note: From [14], likely deprecated or less common) Assign reviewers/assignees even if automerge is enabled. Default Renovate behavior is *not* to add assignees/reviewers if automerge is set, to reduce noise, unless the PR fails checks. [2, 7]
  ],
} as const satisfies JsoncSortKeysOrderMap;
