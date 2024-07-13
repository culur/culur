import latestVersion from 'latest-version';
import { initialPackageManagerNpm } from './initial-package-manager.npm';
import { initialPackageManagerPnpm } from './initial-package-manager.pnpm';
import { initialPackageManagerYarn } from './initial-package-manager.yarn';
import type { Lib } from '~/lib/lib';
import type { Input } from '~/input/input';

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

  }
};
