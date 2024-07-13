import assert from 'node:assert';
import { selectOrDefault } from '@culur/utils-prompts';
import latestVersion from 'latest-version';
import { last } from 'lodash-es';

export const getPackageManagerVersion = async <
  TPackageManager extends 'npm' | 'pnpm' | 'yarn',
  TVersions extends { [key: `${number}`]: string },
>({
  versionOption,
  packageManager,
  packageName,
  versionsMapper,
}: {
  versionOption?: string;
  packageManager: TPackageManager;
  packageName: string;
  versionsMapper: TVersions;
}) => {
  const promiseVersions = (
    Object.keys(versionsMapper) as (keyof TVersions & string)[]
  ).map(async versionShort => {
    const tag = versionsMapper[versionShort] as string;
    const versionFull = await latestVersion(packageName, { version: tag });

    return { versionShort, versionFull };
  });
  const versions = await Promise.all(promiseVersions);
  const choices = versions.map(v => ({
    name: v.versionFull,
    value: v.versionShort,
  }));
  const defaultValue = versions.find(
    c => c.versionShort === versionOption,
  )?.versionShort;

  const versionShort = await selectOrDefault({
    defaultValue,
    config: {
      message: `Select ${packageManager} version`,
      choices,
      default: last(versions)?.versionShort,
    },
  });

  const versionFull = versions.find(
    c => c.versionShort === versionShort,
  )?.versionFull;

  assert(versionFull);

  const packageManagerVersion = `${packageManager}@${versionFull}`;

  return {
    packageManager,
    packageManagerVersion,
    versionShort,
    versionFull,
  };
};
