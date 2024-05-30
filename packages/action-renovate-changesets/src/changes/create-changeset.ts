import dedent from 'dedent';
import fs from 'fs-extra';
import { entries } from '@culur/types';
import core from '@actions/core';
import type { ChangedFiles } from './get-changed-packages';
import { getShortCommitHash } from '~/git/get-short-commit-hash';

export async function createChangeset(changedFiles: ChangedFiles) {
  const shortCommitHash = await getShortCommitHash();

  for (const changedFile of changedFiles) {
    const packageName = changedFile.json.name;
    const shortPackageName = changedFile.json.name
      ?.replace(/^@/, '')
      .replace(/\//, '-');
    const fileName = `.changeset/renovate-${shortCommitHash}-${shortPackageName}.md`;

    const message = entries(changedFile.changedPackages)
      .map(([dependenciesType, changes]) => {
        if (!changes) return null;
        const packages = entries(changes)
          .map(([name, version]) => `- \`${name}\` to \`${version}\``)
          .join('\n');

        return dedent`
          Update \`${dependenciesType}\`:
            ${packages}
        `;
      })
      .filter((s): s is string => s !== null)
      .join('\n');

    const body = [
      dedent`
        ---
        '${packageName}': patch
        ---
      `,
      '',
      message,
      '',
    ].join('\n');

    core.debug(dedent`
      ${fileName}
      -----
      ${body}
    `);

    fs.writeFile(fileName, body);
  }
}
