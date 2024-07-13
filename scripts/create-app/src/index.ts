import process from 'node:process';
import { defaultPrint } from '@culur/utils-prompts';
import chalk from 'chalk';
import { Input } from './input/input';
import { Lib } from './lib/lib';
import { initialFolder } from './scripts/initial-folder';
import { initialGit } from './scripts/initial-git';
import { initialPackageJson } from './scripts/initial-package-json';
import { initialPackageManager } from './scripts/initial-package-manager';

async function main() {
  defaultPrint(chalk.green('----- INPUT -----'));
  const input = await Input.init();

  defaultPrint(chalk.green('------ RUN ------'));
  await initialFolder({ input });
  const lib = new Lib({ input, dirname: import.meta.dirname });

  await initialGit({ input, lib });
  await initialPackageJson({ input, lib });
  await initialPackageManager({ input, lib });
}

main().catch(e => {
  console.error(e);
  process.exit(0);
});
