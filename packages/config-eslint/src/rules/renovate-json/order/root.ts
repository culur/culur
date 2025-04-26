import type { JsoncSortKeysOrder } from '../base/types';
import { assigneesAndReviewersConfig } from '../base/assignees-and-reviewers-config';
import { configMigration } from '../base/config-migration';
import { legacyAdminConfig } from '../base/legacy-admin-config';
import { renovateConfig } from '../base/renovate-config';
import { renovateSharedConfig } from '../base/renovate-shared-config';
import { updateConfig } from '../base/update-config';

// RenovateConfig
// LegacyAdminConfig,
// RenovateSharedConfig,
// UpdateConfig<PackageRule>,
// AssigneesAndReviewersConfig,
// ConfigMigration,
export const rootOrder = [
  //? core config
  ...renovateSharedConfig.config,
  ...renovateConfig.metadata,
  ...renovateConfig.repository,
  ...renovateConfig.forkHandling,
  ...renovateSharedConfig.branch,

  //? migration & dashboard
  ...configMigration,
  ...renovateConfig.dependencyDashboard,
  ...renovateSharedConfig.dependencyDashboard,

  //? schedule
  ...renovateSharedConfig.schedule,
  ...renovateSharedConfig.automerge,
  ...renovateConfig.limits,

  //? grouping
  ...renovateSharedConfig.grouping,
  ...renovateSharedConfig.commit,
  ...renovateSharedConfig.pr,
  ...renovateSharedConfig.labels,
  ...renovateSharedConfig.filtering,
  ...renovateConfig.namingSpecifics,
  ...assigneesAndReviewersConfig.assignees,
  ...assigneesAndReviewersConfig.reviewers,
  ...assigneesAndReviewersConfig.common,

  //? registriesNetwork
  ...renovateConfig.registriesNetwork,

  //? vulnerabilities
  ...renovateConfig.vulnerabilities,
  ...renovateConfig.vulnerabilitiesShared,

  //? rarely
  ...renovateSharedConfig.advanced,
  ...renovateConfig.customization,
  ...renovateConfig.reporting,
  ...renovateConfig.inheritance,
  ...renovateConfig.processControl,
  ...renovateConfig.constraints,
  ...renovateConfig.internalContext,
  ...legacyAdminConfig.onboarding,
  ...legacyAdminConfig.executionLogging,
  ...legacyAdminConfig.configurationRequirements,

  //? overrides
  ...updateConfig.semantic_versioning,
  ...updateConfig.pinning_digests,
  ...updateConfig.lock_file,
  ...updateConfig.special_cases,
  ...renovateConfig.packageRules,
] as const as JsoncSortKeysOrder;
