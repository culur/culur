import { defaultPrint } from '@culur/utils-prompts';
import chalk from 'chalk';
import simpleGit, { Options, SimpleGit } from 'simple-git';
import { Input } from '~/input/input';

export class GitLib {
  public git: SimpleGit;

  public constructor(input: Input) {
    this.git = simpleGit({
      baseDir: input.dir.projectDir,
      config: input.prompt.git?.gitConfig,
    });
  }

  public async commit(
    ...args:
      | [message: string, files: string | string[], options: Options]
      | [message: string, files: string | string[]]
      | [message: string, options: Options]
      | [message: string]
  ) {
    const [message, files, options] = (() => {
      switch (args.length) {
        case 3:
          return args;
        case 2: {
          const [message, filesOrOptions] = args;
          return typeof filesOrOptions === 'string' ||
            Array.isArray(filesOrOptions)
            ? [message, filesOrOptions]
            : [message, '*', filesOrOptions];
        }
        case 1:
          const [message] = args;
          return [message, '*', undefined];
      }
    })();

    defaultPrint(
      null,
      chalk.cyan('>'),
      ['Commit', 'message'],
      chalk.cyan(message),
    );

    await this.git.add(files).commit(message, files, options);
  }
}
