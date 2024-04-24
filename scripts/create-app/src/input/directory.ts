import { defaultPrint } from '@culur/utils-prompts';
import chalk from 'chalk';
import figures from 'figures';
import { basename, join } from 'path';
import { CommandInput } from './command';

export const getDirectoryInput = ({ command }: { command: CommandInput }) => {
  const cwd = process.cwd();
  const projectDir = join(cwd, command.targetDir);
  const projectName = basename(projectDir);

  defaultPrint(
    chalk.green(figures.squareCenter),
    ['Creating project at', 'message'], //
    [projectDir, 'answer'],
  );

  return {
    projectDir,
    projectName,
  };
};

export type DirectoryInput = ReturnType<typeof getDirectoryInput>;
