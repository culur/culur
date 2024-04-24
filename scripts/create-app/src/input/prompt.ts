import { CommandInput } from './command';
import { DirectoryInput } from './directory';
import { getType } from './prompt.type';
import { getOverride } from './prompt.override';
import { getGit } from './prompt.git';
import { getPackageManager } from './prompt.packageManager';

export const getPromptInput = async ({
  command: { options },
  dir,
}: {
  command: CommandInput;
  dir: DirectoryInput;
}) => {
  const override = await getOverride(options, { dir });
  const git = await getGit(options);
  const pm = await getPackageManager(options);

  const type = await getType(options);

  return {
    override,
    git,
    pm,

    type,
  };
};

export type PromptInput = Awaited<ReturnType<typeof getPromptInput>>;
