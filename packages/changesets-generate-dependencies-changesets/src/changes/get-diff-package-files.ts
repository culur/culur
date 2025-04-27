import type { Branches } from '~/input/get-branches';
import process from 'node:process';
import core from '@actions/core';
import exec from '@actions/exec';

export async function getDiffPackageFiles({ baseBranch }: Branches) {
  const diffOutput = await exec.getExecOutput(
    `git diff --name-only origin/${baseBranch} --`,
  );
  const diffFiles = diffOutput.stdout.split('\n');
  if (diffFiles.find(f => f.startsWith('.changeset'))) {
    core.info('Changeset already exists, skipping');
    process.exit(0);
  }

  const diffPackageFiles = diffFiles
    .filter(file => file !== 'package.json') // skip root package.json
    .filter(file => /\/package.json$/.test(file));

  if (diffPackageFiles.length === 0) {
    core.info('No package.json changes to published packages, skipping');
    process.exit(0);
  }

  return diffPackageFiles;
}
