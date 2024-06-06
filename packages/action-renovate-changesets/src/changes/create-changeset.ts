import fs from 'fs-extra';
import { entries } from '@culur/types';
import core from '@actions/core';
import type { DiffPackages } from './get-diff-packages';
import { getShortCommitHash } from '~/git/get-short-commit-hash';

export async function createChangeset(diffPackageFiles: DiffPackages) {
  const shortCommitHash = await getShortCommitHash();

  for (const diffPackageFile of diffPackageFiles) {
    const packageName = diffPackageFile.json.name;
    const shortPackageName = diffPackageFile.json.name
      ?.replace(/^@/, '')
      .replace(/\//, '-');
    const fileName = `.changeset/renovate-${shortCommitHash}-${shortPackageName}.md`;

    const dependencies = entries(diffPackageFile.changedPackages)
      .map(([dependenciesType, changes]) => {
        if (!changes) return null;
        const packages = entries(changes) //
          .map(([name, version]) => `  - \`${name}\` to \`${version}\``);

        return [
          `- \`${dependenciesType}\`:`, //
          ...packages,
        ].join('\n');
      })
      .filter((s): s is string => s !== null)
      .join('\n');

    const body = [
      '---',
      `'${packageName}': patch`,
      '---',
      '',
      'Update dependencies from renovate:',
      '',
      dependencies,
      '',
    ].join('\n');

    const debugMessage = [
      '--------------------------------------------------',
      fileName,
      '--------------------------------------------------',
      body,
    ].join('\n');

    core.debug(debugMessage);

    fs.writeFile(fileName, body);
  }
}
