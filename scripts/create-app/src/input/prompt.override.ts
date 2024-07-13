import process from 'node:process';
import { existsSync, readdirSync } from 'node:fs';
import { selectOrDefault } from '@culur/utils-prompts';
import type { CommandInput } from './command';
import type { DirectoryInput } from './directory';

function isEmpty(path: string) {
  const files = readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

export const getOverride = async (
  options: CommandInput['options'],
  { dir }: { dir: DirectoryInput },
) => {
  const { projectDir: root } = dir;

  if (!existsSync(root) || isEmpty(root)) return 'ignore';

  const answer = await selectOrDefault({
    defaultValue: options.override,
    config: {
      message: `Directory is not empty`,
      choices: [
        { name: 'Remove existing files and continue', value: 'remove' },
        { name: 'Ignore files and continue', value: 'ignore' },
        { name: 'Cancel operation', value: 'abort' },
      ],
    },
  });

  if (answer === 'abort') process.exit(0);

  return answer;
};
