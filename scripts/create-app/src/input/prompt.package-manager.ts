import process from 'node:process';
import { defaultPrint, selectOrDefault } from '@culur/utils-prompts';
import chalk from 'chalk';
import semver from 'semver';
import type { CommandInput } from './command';
import { getPackageManagerVersion } from './prompt.package-manager.version';
import { getToolVersion } from '~/utils/version';

export const getPackageManager = async (options: CommandInput['options']) => {
  const voltaVersion = await getToolVersion('volta');

  if (voltaVersion === null) {
    defaultPrint(chalk.red('!'), ['Please install volta first!', 'error']);
    process.exit(1);
  } else if (!semver.satisfies(voltaVersion, '>=1.1.1')) {
    defaultPrint(
      chalk.red('!'),
      chalk.red('Please upgrade volta to the latest version'),
    );
    process.exit(1);
  }

  const defaultPackageManager = (() => {
    if (options.npm) return 'npm';
    if (options.pnpm) return 'pnpm';
    if (options.yarn) return 'yarn';
  })();

  const packageManager = await selectOrDefault({
    defaultValue: defaultPackageManager ?? options.packageManager,
    config: {
      message: 'Package manager',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'pnpm', value: 'pnpm' },
        { name: 'yarn', value: 'yarn' },
      ],
    },
  });

  if (packageManager === 'pnpm' && process.env.VOLTA_FEATURE_PNPM !== '1') {
    defaultPrint(
      chalk.red('!'),
      chalk.red('Please enable volta pnpm first'),
      chalk.cyan('https://docs.volta.sh/advanced/pnpm'),
    );
    process.exit(1);
  }

  switch (packageManager) {
    case 'npm':
      return getPackageManagerVersion({
        versionOption: options.npm,
        packageManager: 'npm',
        packageName: 'npm',
        versionsMapper: {
          '8': 'next-8',
          '9': 'next-9',
          '10': 'next-10',
        },
      });
    case 'pnpm':
      return getPackageManagerVersion({
        versionOption: options.pnpm,
        packageManager: 'pnpm',
        packageName: 'pnpm',
        versionsMapper: {
          '7': 'next-7',
          '8': 'next-8',
        },
      });
    case 'yarn':
      return getPackageManagerVersion({
        versionOption: options.yarn,
        packageManager: 'yarn',
        packageName: '@yarnpkg/cli-dist',
        versionsMapper: {
          '3': 'v3',
          '4': 'latest',
        },
      });
  }
};
