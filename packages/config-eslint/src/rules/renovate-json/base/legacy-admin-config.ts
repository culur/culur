import type { JsoncSortKeysOrderMap } from './types';

export const legacyAdminConfig = {
  // --- Onboarding Configuration ---
  // Controls the behavior of the initial "onboarding" PR that Renovate creates
  // when it's first enabled on a repository, typically adding the renovate.json config file.
  onboarding: [
    'onboarding', // boolean: Enables or disables the onboarding process. If false, Renovate might not start if no config exists.
    'onboardingBranch', // string: The name of the branch to use for the onboarding PR (e.g., "renovate/configure").
    'onboardingCommitMessage', // string: Custom commit message for the onboarding commit.
    'onboardingPrTitle', // string: Custom title for the onboarding PR.
    'onboardingConfig', // RenovateSharedConfig: A minimal Renovate configuration object to propose in the onboarding PR.
    'onboardingConfigFileName', // string: The filename for the proposed configuration file (e.g., "renovate.json", ".github/renovate.json").
    'onboardingRebaseCheckbox', // boolean: Adds a checkbox to the onboarding PR body allowing users to request Renovate to rebase the PR. (Note: Specific to platform integration).
    'onboardingNoDeps', // 'auto' | 'enabled' | 'disabled': Controls whether the onboarding PR should include initial dependency updates or just the configuration file. 'auto' usually means include updates if few dependencies exist.
  ],

  // --- Configuration Requirements ---
  // Defines requirements for the Renovate configuration itself.
  configurationRequirements: [
    'requireConfig', // RequiredConfig ('required', 'optional', 'ignored'): Specifies whether a Renovate configuration file (`renovate.json`, etc.) is mandatory for Renovate to run on the repository. 'ignored' might be used in centrally managed setups.
  ],

  // --- Execution Environment & Logging (Legacy/Admin) ---
  // These settings are often more relevant for self-hosted Renovate instances or specific admin controls.
  executionLogging: [
    'localDir', // string: Specifies a local directory path, potentially used for caching or temporary files in self-hosted environments. (Note: Less common in typical SaaS usage).
    'logContext', // string: Adds a custom string/context to log messages, helpful for identifying logs from specific Renovate instances or runs.
  ],
} as const satisfies JsoncSortKeysOrderMap;
