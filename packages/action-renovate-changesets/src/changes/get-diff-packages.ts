import exec from '@actions/exec';
import fs from 'fs-extra';
import type { PackageJson } from '@culur/types';
import type { DependenciesType } from './get-dependencies-type';
import { getDependenciesType } from './get-dependencies-type';
import { getDiffPackageFiles } from './get-diff-package-files';
import type { Branches } from '~/setup/get-branches';

export async function getDiffPackages({ baseBranch, headBranch }: Branches) {
  const diffPackageFiles = //
    await getDiffPackageFiles({ baseBranch, headBranch });

  const diffPackages: {
    packageFile: string;
    json: PackageJson;
    changedPackages: { [key in DependenciesType]?: Record<string, string> };
  }[] = [];

  for (const packageFile of diffPackageFiles) {
    const json: PackageJson = await fs.readJson(packageFile);
    const changedLines = await exec.getExecOutput(
      `git diff origin/${baseBranch} -- ${packageFile}`,
    );

    const changedPackages: {
      [key in DependenciesType]?: Record<string, string>;
    } = {};

    for (const changedLine of changedLines.stdout.split('\n')) {
      const result = /^\+\s*"(.+)": "(.+)",?$/.exec(changedLine);
      if (!result) continue;

      const [, packageName, packageVersion] = result;
      const type = getDependenciesType(json, packageName, packageVersion);

      if (!changedPackages[type]) changedPackages[type] = {};
      changedPackages[type]![packageName] = packageVersion;
    }

    diffPackages.push({ packageFile, json, changedPackages });
  }
  return diffPackages;
}

export type DiffPackages = Awaited<ReturnType<typeof getDiffPackages>>;
