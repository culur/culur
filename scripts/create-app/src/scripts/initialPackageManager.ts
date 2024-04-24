import latestVersion from 'latest-version';
import { Input } from '~/input/input';
import { Lib } from '~/lib/lib';
import { initialPackageManagerNpm } from './initialPackageManager.npm';
import { initialPackageManagerPnpm } from './initialPackageManager.pnpm';
import { initialPackageManagerYarn } from './initialPackageManager.yarn';

export const initialPackageManager = async ({
  input: { prompt },
  lib,
}: {
  input: Input;
  lib: Lib;
}) => {
  const nodeVersion = await latestVersion('node', { version: '20' });
  await lib.exec.run`volta pin node@${nodeVersion}`;

  switch (prompt.pm.packageManager) {
    case 'npm':
      await initialPackageManagerNpm({ pm: prompt.pm, lib });
      return;
    case 'pnpm':
      await initialPackageManagerPnpm({ pm: prompt.pm, lib });
      return;
    case 'yarn':
      await initialPackageManagerYarn({ pm: prompt.pm, lib });
      return;
  }
};
