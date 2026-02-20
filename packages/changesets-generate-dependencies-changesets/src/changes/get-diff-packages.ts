import type { PackageJsonExtends } from '@culur/types';
import type { DependenciesType } from './get-dependencies-type';
import type { Branches } from '~/input/get-branches';
import { getExecOutput } from '@actions/exec';
import fs from 'fs-extra';
import { getDependenciesType } from './get-dependencies-type';
import { getDiffPackageFiles } from './get-diff-package-files';

export async function getDiffPackages({
  branches: { baseBranch, headBranch },
}: {
  branches: Branches;
}) {
  const diffPackageFiles = await getDiffPackageFiles({
    baseBranch,
    headBranch,
  });

  const diffPackages: {
    packageFile: string;
    json: PackageJsonExtends;
    changedPackages: { [key in DependenciesType]?: Record<string, string> };
  }[] = [];

  for (const packageFile of diffPackageFiles) {
    const json: PackageJsonExtends = await fs.readJson(packageFile);
    const changedLines = await getExecOutput(
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

      /* v8 ignore else -- @preserve */
      if (!changedPackages[type]) changedPackages[type] = {};
      changedPackages[type]![packageName] = packageVersion;
    }

    diffPackages.push({ packageFile, json, changedPackages });
  }
  return diffPackages;
}

export type DiffPackages = Awaited<ReturnType<typeof getDiffPackages>>;
