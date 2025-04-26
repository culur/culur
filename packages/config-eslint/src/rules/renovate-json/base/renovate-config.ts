import type { JsoncSortKeysOrderMap } from './types';

export const renovateConfig = {
  // --- Metadata ---
  metadata: [
    'description', // string | string[]: Description for the repository (often used in platform UI).
  ],

  // --- Base Repository & Branching Strategy ---
  repository: [
    'baseBranches', // string[]: List of base branches Renovate should operate on (e.g., ["main", "develop"]).
    'defaultBranch', // string: Explicitly specifies the default branch if detection fails or needs override. (Note: Often detected automatically).
    'useBaseBranchConfig', // UseBaseBranchConfigType: How to handle configuration when running on non-default base branches ('merge' or 'none').
    'gitAuthor', // string: Custom git author for commits made by Renovate (e.g., "Renovate Bot <bot@renovateapp.com>").
  ],

  // --- Fork Handling ---
  forkHandling: [
    'forkProcessing', // 'auto' | 'enabled' | 'disabled': How Renovate should handle running on repository forks. 'auto' usually disables on forks.
    'isFork', // boolean: Explicitly tells Renovate if the current repository is a fork. (Usually detected).
    'forkModeDisallowMaintainerEdits', // boolean: When running on a fork, disallow maintainers of the upstream repo from editing the PR.
  ],

  // --- Dependency Dashboard ---
  dependencyDashboard: [
    'dependencyDashboard', // boolean: Enables or disables the creation and management of the Dependency Dashboard issue.
    'dependencyDashboardTitle', // string: Custom title for the Dependency Dashboard issue.
    'dependencyDashboardHeader', // string: Custom content to add to the top of the Dependency Dashboard body.
    'dependencyDashboardFooter', // string: Custom content to add to the bottom of the DependencyDashboard body.
    'dependencyDashboardLabels', // string[]: Labels to add to the Dependency Dashboard issue.
    'dependencyDashboardChecks', // Record<string, string>: Configure approval checkboxes within the dashboard.
    'dependencyDashboardAutoclose', // boolean: Automatically close the Dependency Dashboard issue if there are no pending updates.
    'dependencyDashboardOSVVulnerabilitySummary', // 'none' | 'all' | 'unresolved': Controls the display of OSV vulnerability summaries in the dashboard.
    'customizeDashboard', // Record<string, string>: Further customization options for the dashboard's appearance or behavior. (Note: Seems like a flexible key-value store for dashboard tweaks).
    // 'dependencyDashboardIssue',            // number: Internal state, the number of the existing dashboard issue. (Note: Likely not user-configured directly).
  ],

  // --- Rate Limiting & Concurrency ---
  limits: [
    'branchConcurrentLimit', // number | null: Maximum number of branches Renovate can create concurrently.
    'prConcurrentLimit', // number: Maximum number of Pull Requests Renovate can create or update concurrently.
    'prHourlyLimit', // number: Maximum number of Pull Requests Renovate can create per hour.
  ],

  // --- Branch/Commit Naming (Specific Overrides/Additions) ---
  namingSpecifics: [
    'branchTopic', // string: A specific topic to use for branch naming, potentially overriding `commitMessageTopic`. (Note: Granular control over branch naming).
    'additionalBranchPrefix', // string: Another prefix to add *after* the main `branchPrefix` but before the rest of the branch name. (Note: For more complex branch naming schemes).
    'commitBody', // string: Explicitly set the entire commit message body, potentially overriding templates. (Note: Less common than using templating options).
  ],

  // --- Registry & Network Configuration ---
  registriesNetwork: [
    'hostRules', // HostRule[]: Rules for authentication, endpoints, or other behaviors specific to certain hosts (e.g., private registries).
    'defaultRegistryUrls', // string[]: Default registry URLs to use for package managers if not otherwise specified.
    'registryUrls', // string[] | null: Overrides detected registry URLs.
    'registryAliases', // Record<string, string>: Aliases for registry URLs.
    's3Endpoint', // string: Custom endpoint URL for S3 interactions (e.g., for reports).
    's3PathStyle', // boolean: Use path-style access for S3 instead of virtual-hosted style.
  ],

  // --- Vulnerability Management ---
  vulnerabilities: [
    'vulnerabilityAlerts', // RenovateSharedConfig: Configuration specific to how vulnerability updates are handled (can inherit shared config structure).
    'osvVulnerabilityAlerts', // boolean: Specifically enables checking for vulnerabilities using the OSV database.
  ],
  vulnerabilitiesShared: [
    'vulnerabilitySeverity', // string: Minimum vulnerability severity level to report or act upon (e.g., "high", "critical").
  ],

  // --- Customization & Extensibility ---
  customization: [
    'customManagers', // CustomManager[]: Definitions for custom package managers not built into Renovate.
    'customDatasources', // Record<string, CustomDatasourceConfig>: Definitions for custom datasources to find package versions.
    'secrets', // Record<string, string>: A key-value store for secrets needed during Renovate runs (e.g., tokens accessed via `process.env`). (Note: For securely passing sensitive data).
    'env', // UserEnv: User-defined environment variables to be set when Renovate executes package manager commands.
  ],

  // --- Reporting ---
  reporting: [
    'reportPath', // string: Path (for file type) or bucket/key (for S3 type) for saving run reports.
    'reportType', // 'logging' | 'file' | 's3' | null: How and where to generate reports about Renovate runs.
  ],

  // --- Configuration Inheritance ---
  inheritance: [
    'inheritConfig', // boolean: Whether to inherit configuration from a shared repository (defaults to true for Renovate App/Enterprise).
    'inheritConfigFileName', // string: Custom filename for the shared configuration file in the inheritance repository.
    'inheritConfigRepoName', // string: Specify the repository from which to inherit configuration.
    'inheritConfigStrict', // boolean: If true, errors during config inheritance will stop the Renovate run.
    'ignorePresets', // string[]: List of preset configurations (from `extends`) to ignore.
    'force', // RenovateConfig: A nested configuration object used for forcing specific settings (often via CLI).
  ],

  // --- Process Control & Execution ---
  processControl: [
    'skipInstalls', // boolean | null: Skip package manager install/build steps (use with caution, may break updates).
    'updateInternalDeps', // boolean: Whether to update dependencies that point to other modules within the same monorepo.
    'cloneSubmodulesFilter', // string[]: Filters to apply when deciding which submodules to clone.
    'fetchChangeLogs', // FetchChangeLogsOptions: Options controlling if and how changelogs are fetched.
    'logLevelRemap', // LogLevelRemap[]: Rules to remap log levels from specific modules or contexts.
    'statusCheckNames', // Record<StatusCheckKey, string | null>: Override the names of status checks Renovate looks for or reports.
    'configWarningReuseIssue', // boolean: If true, configuration warnings will be posted as comments on a single, reused issue instead of creating new ones.
    'postUpdateOptions', // string[]: Options passed to post-update scripts or hooks. (Note: Related to `postUpgradeTasks` in SharedConfig, perhaps providing context/flags).
  ],

  // --- Constraints ---
  constraints: [
    'constraints', // Record<string, string>: Define version constraints for dependencies (e.g., force a specific version range globally).
    'constraintsFiltering', // ConstraintsFilter: Control how constraints are applied ('none', 'strict', 'loose').
  ],

  // --- Internal State / Contextual (Likely not configured directly in main config) ---
  internalContext: [
    'depName', // string: The name of the specific dependency being processed in a rule context.
    'baseBranch', // string: The specific base branch being processed in the current run.
    'branchList', // string[]: List of branches detected in the repository.
    'errors', // ValidationMessage[]: Collection of configuration errors found during parsing.
    'fileList', // string[]: List of files relevant to the current operation.
    'packageFile', // string: The specific package file being processed.
    'repoIsOnboarded', // boolean: Flag indicating if the repository onboarding process is complete.
    'repoIsActivated', // boolean: Flag indicating if Renovate is activated for the repository.
    'warnings', // ValidationMessage[]: Collection of configuration warnings found during parsing.
    'checkedBranches', // string[]: List of branches that have already been processed in the current run.
    'sharedVariableName', // string: Name of a variable used for sharing data between runs or stages. (Note: Advanced/internal usage).
  ],

  // --- PackageRules ---
  packageRules: [
    'packageRules', // PackageRule[]: The core mechanism for customizing Renovate's behavior for specific dependencies or groups.
  ],
} as const satisfies JsoncSortKeysOrderMap;
