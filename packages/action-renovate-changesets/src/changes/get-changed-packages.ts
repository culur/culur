import process from 'node:process';
import core from '@actions/core';
import exec from '@actions/exec';
import fs from 'fs-extra';
import type { PackageJson } from 'type-fest';
import type { DependenciesType } from './get-dependencies-type';
import { getDependenciesTypes } from './get-dependencies-type';
import type { Input } from '~/input/get-input';

export async function getChangedPackages({ baseBranch }: Input) {
  const diffOutput = await exec.getExecOutput(
    `git diff --name-only ${baseBranch}`,
  );
  const diffFiles = diffOutput.stdout.split('\n');
  if (diffFiles.find(f => f.startsWith('.changeset'))) {
    core.info('Changeset already exists, skipping');
    process.exit(0);
  }

  const packageJsonFiles = diffFiles
    .filter(file => file !== 'package.json') // skip root package.json
    .filter(file => file.includes('package.json'));

  if (packageJsonFiles.length === 0) {
    core.info('No package.json changes to published packages, skipping');
    process.exit(0);
  }

  const output = [];
  for (const file of packageJsonFiles) {
    const json: PackageJson = await fs.readJson(file);
    const changedLines = await exec.getExecOutput('git', [
      'diff',
      baseBranch,
      file,
    ]);

    const changedPackages: {
      [key in DependenciesType]?: Record<string, string>;
    } = {};

    for (const changedLine of changedLines.stdout.split('\n')) {
      const result = /^\+\s*"(.+)": "(.+)",?$/.exec(changedLine);
      if (!result) continue;

      const [, packageName, packageVersion] = result;
      const type = getDependenciesTypes(json, packageName, packageVersion);

      if (!changedPackages[type]) changedPackages[type] = {};
      changedPackages[type]![packageName] = packageVersion;
    }

    output.push({ file, json, changedPackages });
  }
  return output;
}

export type ChangedFiles = Awaited<ReturnType<typeof getChangedPackages>>;
