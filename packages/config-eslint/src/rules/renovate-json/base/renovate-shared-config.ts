import type { JsoncSortKeysOrderMap } from './types';

export const renovateSharedConfig = {
  // --- Core Configuration ---
  config: [
    '$schema', // string: Reference to the JSON schema for validation.
    'extends', // string[]: Specifies configuration presets to inherit from.
    'enabled', // boolean: Enables or disables Renovate for the repository or rule.
    'enabledManagers', // string[]: List of package managers to enable (e.g., ["npm", "docker"]).
  ],

  // --- Dependency Dashboard ---
  dependencyDashboard: [
    'dependencyDashboardApproval', // boolean: Requires manual approval via the Dependency Dashboard checkbox before a PR is created.
  ],

  // --- Scheduling and Timezone ---
  schedule: [
    'schedule', // string[]: Defines when Renovate should run using cron syntax or presets.
    'timezone', // string: Timezone to use for scheduling (e.g., "UTC", "America/New_York").
  ],

  // --- Automerge ---
  automerge: [
    'automerge', // boolean: Enables automatic merging of PRs when conditions are met.
    // TODO: (Note: Not in original list, added for context, potentially maps to other settings).
    'automergeType', // 'pr' | 'branch-push' | 'pr-comment': Specifies the automerge mechanism. Deprecated/renamed?
    'automergeStrategy', // MergeStrategy ('auto', 'merge', 'rebase', 'squash'): The merge strategy to use for automerging.
    'automergeSchedule', // string[]: Schedules automerging attempts independently of PR updates.
    'internalChecksAsSuccess', // boolean: Considers Renovate's internal checks as successful for automerge status checks.
    // TODO: (Note: Not in original list, but common).
    'platformAutomerge', // boolean: Use the platform's native automerge feature if available.
  ],

  // --- Branch Management ---
  branch: [
    'branchPrefix', // string: Prefix added to all Renovate-created branches.
    'branchName', // string: Template for naming Renovate branches.
    'branchNameStrict', // boolean: If true, enforces stricter validation for branch names.
    'hashedBranchLength', // number: Length of the hash appended to branch names when needed.
    'pruneBranchAfterAutomerge', // boolean: Automatically delete the branch after a PR is automerged.
    // 'branchPrefixOld',       // string: Potentially deprecated or for specific migration scenarios.
  ],

  // --- Grouping Dependencies ---
  grouping: [
    'group', // GroupConfig: More detailed configuration for grouping dependencies.
    'groupName', // string: A custom name for a group of dependencies updated together in one PR.
    'groupSlug', // string: A URL-friendly slug for the group name.
  ],

  // --- Commit Management ---
  commit: [
    'semanticCommits', // 'auto' | 'enabled' | 'disabled': Controls the use of semantic commit messages.
    'semanticCommitType', // string: The type used in semantic commits (e.g., "fix", "chore").
    'semanticCommitScope', // string | null: The scope used in semantic commits.
    'commitMessagePrefix', // string: Prefix added to all commit messages.
    'commitMessage', // string: Template for the commit message body.
    'commitMessageAction', // string: Action part of the commit message (e.g., "Update", "Pin").
    'commitMessageTopic', // string: Topic part of the commit message (e.g., dependency name).
    'commitMessageExtra', // string: Additional details appended to the commit message.
    'commitMessageLowerCase', // 'auto' | 'never': Controls the casing of the commit message header.
    'platformCommit', // PlatformCommitOptions: Platform-specific commit options.
  ],

  // --- Pull Request (PR) Management ---
  pr: [
    'prCreation', // 'immediate' | 'not-pending' | 'status-success' | 'approval': Controls when PRs are created based on checks/approvals.
    'draftPR', // boolean: Creates PRs as drafts initially.
    'recreateClosed', // boolean: Recreate PRs if they were manually closed without merging.
    'recreateWhen', // RecreateWhen: Specifies conditions under which closed PRs should be recreated.
    'prBodyColumns', // string[]: Specifies which columns to include in the PR body's dependency table.
    'prBodyDefinitions', // Record<string, string>: Custom definitions/text for sections within the PR body.
    'prPriority', // number: Sets a priority level for the PR (platform-dependent).
    'confidential', // boolean: Marks the PR as confidential (platform-dependent, e.g., GitLab).
    'milestone', // number: Assigns the PR to a specific milestone number.
  ],

  // --- Labels ---
  labels: [
    'labels', // string[]: List of labels to be added to created PRs.
    'addLabels', // string[]: Additional labels to add (often used in package rules).
    'keepUpdatedLabel', // string: Label indicating a PR should be kept up-to-date by Renovate, even if tests fail.
    'rebaseLabel', // string: Label that triggers Renovate to rebase the PR.
    'stopUpdatingLabel', // string: Label that tells Renovate to stop updating a specific PR.
  ],

  // --- Dependency Filtering and Matching ---
  filtering: [
    'ignoreDeps', // string[]: List of dependency names to ignore completely.
    'ignorePaths', // string[]: List of file paths or glob patterns to ignore during scanning.
    'includePaths', // string[]: List of file paths or glob patterns to explicitly include (if others are ignored).
    'fileMatch', // string[]: Glob patterns for matching dependency files.
    'respectLatest', // boolean: Whether to strictly respect the 'latest' tag instead of potentially newer versions.
    'ignoreTests', // boolean: Option to ignore dependencies typically found only in test/development scopes.
  ],

  // --- Advanced / Less Common ---
  advanced: [
    'postUpgradeTasks', // PostUpgradeTasks: Defines commands or scripts to run after dependency upgrades.
    'npmrc', // string: Allows providing custom .npmrc content for Renovate's operations.
    'npmrcMerge', // boolean: Whether to merge provided npmrc content with existing files.
    'changelogUrl', // string: A custom URL template for linking to changelogs.
    'gitIgnoredAuthors', // string[]: List of git commit authors whose commits should be ignored by Renovate (e.g., bots).
    'unicodeEmoji', // boolean: Use Unicode emojis (e.g., ✨) instead of text alternatives (e.g., :sparkles:).
    'suppressNotifications', // string[]: List of notification types to suppress.
    'productLinks', // Record<string, string>: Custom links for product documentation shown in PRs.
    'rebaseWhen', // string ('auto', 'behind-base-branch', 'conflicted', 'never'): Conditions under which Renovate should rebase PRs.
    // 'manager',               // string: Usually context-specific, identifies the package manager being used.
    // 'repository',            // string: Usually context-specific, the name of the repository.
    // 'repositoryCache',       // RepositoryCacheConfig: Configuration for caching repository data.
    // 'repositoryCacheType',   // RepositoryCacheType: Type of repository cache ('local', 'shared', etc.).
    // 'autoReplaceGlobalMatch',// boolean: Advanced feature related to global replacements (less common).
    // 'force',                 // RenovateConfig: Allows forcing specific configurations, overriding others (use with caution).
  ],
} as const satisfies JsoncSortKeysOrderMap;
