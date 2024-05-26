import assert from 'node:assert';
import { sortPackageJson as sortPackageJsonAntfu } from '@antfu/eslint-config';
import type { OverrideConfig } from './types';

export const sortPackageJson: OverrideConfig = {
  name: 'antfu/sort/package-json',
  async config() {
    const [configItem] = await sortPackageJsonAntfu();
    assert(typeof configItem.name === 'string');
    assert(typeof configItem.rules === 'object');

    const sortKeys = configItem.rules['jsonc/sort-keys'];
    assert(typeof sortKeys === 'object');

    const [, options] = sortKeys;
    assert(typeof options === 'object');

    options.order = [
      //? Project
      'publisher',
      'name',
      'displayName',
      'version',
      'description',
      'private',
      'publishConfig',

      //? Repository
      'repository',
      'bugs',
      'homepage',
      'funding',

      //? Author & license
      'contributors',
      'author',
      'license',

      //? https://code.visualstudio.com/api/references/extension-manifest
      'keywords',
      'categories',

      //? CDN
      'unpkg',
      'jsdelivr',

      //? Export
      'type', // module or commonjs
      'main',
      'types',
      'typings', // synonymous with types
      'typesVersions',
      'exports',
      'bin',
      'files',
      'workspaces',

      //? https://code.visualstudio.com/api/references/extension-manifest
      'icon',
      'activationEvents',
      'contributes',

      //? Scripts
      'scripts',

      //? Node & packageManager
      'volta',
      'engines',
      'packageManager',

      //? Dependencies
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'peerDependenciesMeta',
      'bundleDependencies',
      'optionalDependencies',

      'pnpm',
      'overrides',
      'resolutions',

      //? Lib config
      'husky',
      'simple-git-hooks',
      'lint-staged',
      'eslintConfig',
    ];

    return configItem;
  },
};
