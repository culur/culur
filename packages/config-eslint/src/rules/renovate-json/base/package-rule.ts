import type { JsoncSortKeysOrderMap } from './types';

export const packageRule = {
  // --- Metadata ---
  metadata: [
    'description', // string | string[]: Human-readable description of what this package rule does, useful for documenting complex configurations.
  ],

  // --- Range Strategy ---
  rangeStrategy: [
    'rangeStrategy', // 'auto' | 'pin' | 'bump' | 'replace' | 'widen' | 'update-lockfile' | 'in-range-only': Determines how to modify or update existing ranges
  ],

  // --- Rule Matching Criteria (Core) ---
  // These properties determine *which* dependencies or updates this rule applies to.
  matching: [
    'matchPackageNames', // string[]: Apply rule if dependency name matches any in this list (e.g., ["react", "lodash"]).
    'matchDepNames', // string[]: Apply rule if dependency name matches (similar to matchPackageNames, can be broader).
    'matchManagers', // string[]: Apply rule if the dependency is managed by one of these package managers (e.g., ["npm", "docker"]).
    'matchDatasources', // string[]: Apply rule if the dependency's version source matches (e.g., ["npm", "git-tags", "docker"]).
    'matchDepTypes', // string[]: Apply rule if the dependency type matches (e.g., ["dependencies", "devDependencies", "peerDependencies"]).
    'matchUpdateTypes', // UpdateType[]: Apply rule based on the type of update (e.g., ["major", "minor", "patch", "pin", "digest"]).
    'matchCategories', // string[]: Apply rule if dependency belongs to specified categories (defined via extractConfigs or presets like "linters").
    'matchCurrentVersion', // string: Apply rule if the *currently installed* version matches this pattern (supports regex).
    'matchSourceUrls', // string[]: Apply rule if the dependency's source repository URL matches any pattern in the list.
    'matchFileNames', // string[]: Apply rule if the dependency is found in a file matching any pattern in this list.
    'matchBaseBranches', // string[]: Apply rule only when Renovate is running against one of these base branches.
    'matchRepositories', // string[]: Apply rule only when Renovate is running in a repository matching one of these names.
    'matchCurrentValue', // string: Apply rule if the current value (e.g., Docker tag) matches this pattern.
    'matchNewValue', // string: Apply rule if the proposed new value/version matches this pattern.
    'matchCurrentAge', // string: Apply rule based on how long the current version has been used (e.g., "> 3 months").
    'matchConfidence', // MergeConfidence[]: Apply rule based on Renovate's calculated merge confidence level (e.g., ["high", "very-high"]).
    'matchJsonata', // string[]: Advanced matching using JSONata queries against dependency metadata.
  ],

  // --- Registry & Network Configuration ---
  registriesNetwork: [
    'registryUrls', // string[] | null: Override the global or default registry URLs specifically for dependencies matched by this rule.
  ],

  // --- Vulnerability Specific Matching ---
  vulnerabilities: [
    'isVulnerabilityAlert', // boolean: (Note: Likely an internal flag set by Renovate, used to *match* rules against updates that *are* vulnerability fixes, rather than being set directly by the user). Apply rule if the update addresses a known vulnerability.
    'vulnerabilityFixVersion', // string: Apply rule if the vulnerability fix is targeting this specific version.
  ],
  vulnerabilitiesShared: [
    'vulnerabilitySeverity', // string: Minimum vulnerability severity level to report or act upon (e.g., "high", "critical").
  ],
} as const satisfies JsoncSortKeysOrderMap;
