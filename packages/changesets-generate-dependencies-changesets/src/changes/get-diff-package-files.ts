import type { Branches } from '~/input/get-branches';
import process from 'node:process';
import { info } from '@actions/core';
import { getExecOutput } from '@actions/exec';

const packageJsonRegex = /\/package.json$/;

export async function getDiffPackageFiles({ baseBranch }: Branches) {
  const diffOutput = await getExecOutput(
    `git diff --name-only origin/${baseBranch} --`,
  );
  const diffFiles = diffOutput.stdout.split('\n');
  if (diffFiles.some(f => f.startsWith('.changeset'))) {
    info('Changeset already exists, skipping');
    process.exit(0);
  }

  const diffPackageFiles = diffFiles
    .filter(file => file !== 'package.json') // skip root package.json
    .filter(file => packageJsonRegex.test(file));

  if (diffPackageFiles.length === 0) {
    info('No package.json changes to published packages, skipping');
    process.exit(0);
  }

  return diffPackageFiles;
}
