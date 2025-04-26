import type { JsoncSortKeysOrder } from '../base/types';
import { packageRule } from '../base/package-rule';
import { renovateSharedConfig } from '../base/renovate-shared-config';
import { updateConfig } from '../base/update-config';

// PackageRule
// RenovateSharedConfig
// UpdateConfig
export const packageRuleOrder = [
  //? core config
  ...packageRule.metadata,
  ...renovateSharedConfig.config,
  ...renovateSharedConfig.branch,

  //? migration & dashboard
  ...renovateSharedConfig.dependencyDashboard,

  //? schedule
  ...renovateSharedConfig.schedule,
  ...renovateSharedConfig.automerge,

  //? grouping
  ...renovateSharedConfig.grouping,
  ...renovateSharedConfig.commit,
  ...renovateSharedConfig.pr,
  ...renovateSharedConfig.labels,
  ...renovateSharedConfig.filtering,

  //? rangeStrategy
  ...packageRule.rangeStrategy,

  //? matching
  ...packageRule.matching,
  ...packageRule.registriesNetwork,

  //? vulnerabilities
  ...packageRule.vulnerabilities,
  ...packageRule.vulnerabilitiesShared,

  //? rarely
  ...renovateSharedConfig.advanced,

  //? overrides
  ...updateConfig.semantic_versioning,
  ...updateConfig.pinning_digests,
  ...updateConfig.lock_file,
  ...updateConfig.special_cases,
] as const as JsoncSortKeysOrder;
