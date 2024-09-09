import core from '@actions/core';
import { entries } from '@culur/types';
import fs from 'fs-extra';
import type { Commit } from '~/input/get-commit';
import type { DiffPackages } from './get-diff-packages';

export async function createChangeset({
  diffPackageFiles,
  commit,
}: {
  diffPackageFiles: DiffPackages;
  commit: Commit;
}) {
  for (const diffPackageFile of diffPackageFiles) {
    const packageName = diffPackageFile.json.name;
    const shortPackageName = diffPackageFile.json.name
      ?.replace(/^@/, '')
      .replace(/\//, '-');
    const fileName = `.changeset/renovate-${commit.hash}-${shortPackageName}.md`;

    const dependencies = entries(diffPackageFile.changedPackages)
      .map(([dependenciesType, changes]) => {
        if (!changes) return null;
        const packages = entries(changes) //
          .map(([name, version]) => `  - \`${name}@${version}\``);

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
      'Update dependencies:',
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
