import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import type {
  YamlSortKeysRecord,
  YamlSortSequenceValuesRecord,
} from './yaml-order';
import { yamlOrder } from './yaml-order';

export const pnpmWorkspaceSortKeys = {
  root: {
    pathPattern: /^$/.source,
    order: [
      //! Monorepo
      'packages',
      'catalog',

      //! Dependency Resolution
      'overrides',
      'packageExtensions',
      'allowedDeprecatedVersions',
      'updateConfig',
      'supportedArchitectures',
      'ignoredOptionalDependencies',
      'minimumReleaseAge',
      'minimumReleaseAgeExclude',
      'minimumReleaseAgeIgnoreMissingTime',
      'minimumReleaseAgeStrict',
      'trustPolicy',
      'trustPolicyExclude',
      'trustPolicyIgnoreAfter',
      'trustLockfile',
      'blockExoticSubdeps',
      'registries',
      'namedRegistries',

      //! Dependency Hoisting Settings
      'hoist',
      'hoistWorkspacePackages',
      'hoistPattern',
      'publicHoistPattern',
      'shamefullyHoist',

      //! Node-Modules Settings
      'modulesDir',
      'nodeLinker',
      'symlink',
      'enableModulesDir',
      'virtualStoreDir',
      'virtualStoreDirMaxLength',
      'virtualStoreOnly',
      'packageImportMethod',
      'modulesCacheMaxAge',
      'dlxCacheMaxAge',
      'enableGlobalVirtualStore',

      //! Store Settings
      'storeDir',
      'verifyStoreIntegrity',
      'useRunningStoreServer',
      'strictStorePkgContentCheck',

      //! Network Settings
      'httpsProxy',
      'httpProxy',
      'noProxy',
      'localAddress',
      'maxsockets',
      'strictSsl',

      //! Lockfile Settings
      'lockfile',
      'preferFrozenLockfile',
      'lockfileIncludeTarballUrl',
      'gitBranchLockfile',
      'mergeGitBranchLockfilesBranchPattern',
      'peersSuffixMaxLength',

      //! Request Settings
      'gitShallowHosts',
      'networkConcurrency',
      'fetchRetries',
      'fetchRetryFactor',
      'fetchRetryMintimeout',
      'fetchRetryMaxtimeout',
      'fetchTimeout',
      'fetchWarnTimeoutMs',
      'fetchMinSpeedKiBps',

      //! Peer Dependency Settings
      'autoInstallPeers',
      'dedupePeerDependents',
      'dedupePeers',
      'strictPeerDependencies',
      'resolvePeersFromWorkspaceRoot',
      'peerDependencyRules',

      //! CLI Settings
      '[no-]color',
      'loglevel',
      'useBetaCli',
      'recursiveInstall',
      'engineStrict',
      'npmPath',
      'pmOnFail',
      'ignoreWorkspaceRootCheck',

      //! Build Settings
      'ignoreScripts',
      'childConcurrency',
      'sideEffectsCache',
      'sideEffectsCacheReadonly',
      'unsafePerm',
      'nodeOptions',
      'verifyDepsBeforeRun',
      'strictDepBuilds',
      'allowBuilds',
      'dangerouslyAllowAllBuilds',

      //! Node.js Settings
      'nodeVersion',
      'runtimeOnFail',
      'nodeDownloadMirrors',

      //! Other Settings
      'savePrefix',
      'tag',
      'globalDir',
      'globalBinDir',
      'npmrcAuthFile',
      'stateDir',
      'cacheDir',
      'useStderr',
      'updateNotifier',
      'preferSymlinkedExecutables',
      'ignoreCompatibilityDb',
      'resolutionMode',
      'registrySupportsTimeField',
      'extendNodePath',
      'deployAllFiles',
      'dedupeDirectDeps',
      'optimisticRepeatInstall',
      'requiredScripts',
      'enablePrePostScripts',
      'scriptShell',
      'shellEmulator',
      'catalogMode',
      'ci',
      'cleanupUnusedCatalogs',
    ],
  },
  packages: {
    pathPattern: `^(${[
      'overrides',
      'packageExtensions',
      'allowedDeprecatedVersions',
      'updateConfig',
      'supportedArchitectures',
      'registries',
      'namedRegistries',
    ].join('|')})$`,
    order: yamlOrder,
  },
} satisfies Record<string, YamlSortKeysRecord>;

export const pnpmWorkspaceSortSequenceValues = {
  packages: {
    pathPattern: `^(${[
      'ignoredOptionalDependencies',
      'minimumReleaseAgeExclude',
      'trustPolicyExclude',
    ].join('|')})$`,
    order: yamlOrder,
  },
} satisfies Record<string, YamlSortSequenceValuesRecord>;

export const pnpmWorkspaceYamlRules: TypedFlatConfigItem = {
  name: 'culur/pnpm-workspace-yaml/rules',
  files: ['pnpm-workspace.yaml'],
  rules: {
    'yaml/sort-keys': [
      'error',
      pnpmWorkspaceSortKeys.root,
      pnpmWorkspaceSortKeys.packages,
    ],
    'yaml/sort-sequence-values': [
      'error',
      pnpmWorkspaceSortSequenceValues.packages,
    ],
  },
};
