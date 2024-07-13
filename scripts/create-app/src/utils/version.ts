import { $ } from 'execa';
import semver from 'semver';

export const getToolVersion = async (
  packageManager: 'volta' | 'npm' | 'pnpm' | 'yarn',
) => {
  try {
    const { stdout } = await $`${packageManager} -v`;
    if (semver.valid(stdout)) return stdout;
  } catch {}

  return null;
};
