import process from 'node:process';
import { createCommand } from '@commander-js/extra-typings';

const authorName = 'culur';
const authorEmail = 'culur.net@gmail.com';

export const getCommandInput = () => {
  const program = createCommand('Culur create app')
    .argument('<targetDir>')
    .option('-o, --override <override>', 'Override if directory is not empty')

    .option('-t, --type <type>', 'Choose project type')
    .option('-fw, --framework <framework>', 'Choose framework')
    .option('-b, --builder <builder>', 'Choose builder')

    .option('--git', 'Git', undefined)
    .option('--no-git', 'No git', undefined)
    .option('--git-author-name <name>', 'Git commit author name', authorName)
    .option('--git-author-email <email>', 'Git commit author name', authorEmail)

    .option('-pm, --package-manager <package-manager>', 'Package manager')
    .option('--npm <version>', 'Npm version: 8 | 9 | 10')
    .option('--pnpm <version>', 'Pnpm version: 8 | 9')
    .option('--yarn <version>', 'Yarn version: 3 | 4')
    .parse(process.argv);

  const args = program.parse();
  const [targetDir] = args.processedArgs;

  const options = program.opts();
  const git = typeof options.git === 'boolean' ? options.git : undefined;

  return {
    options: { ...options, git },
    targetDir,
  };
};

export type CommandInput = ReturnType<typeof getCommandInput>;
