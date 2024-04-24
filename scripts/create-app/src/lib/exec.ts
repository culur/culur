import { defaultPrint } from '@culur/utils-prompts';
import chalk from 'chalk';
import { $, Execa$, TemplateExpression } from 'execa';
import { DirectoryInput } from '~/input/directory';

export class ExecLib {
  private execa: Execa$;

  public constructor(dir: DirectoryInput) {
    this.execa = $({ cwd: dir.projectDir });
  }

  public run(
    templates: TemplateStringsArray,
    ...expressions: TemplateExpression[]
  ) {
    const command = String.raw(templates, ...expressions);

    if (
      command.startsWith('npm') ||
      command.startsWith('pnpm') ||
      command.startsWith('yarn') ||
      command.startsWith('node')
    ) {
      defaultPrint(
        chalk.cyan('>'), //
        ['Run', 'message'],
        chalk.cyan.dim('volta run'),
        chalk.cyan(command),
      );
      return this.execa`volta run ${command}`;
    } else {
      defaultPrint(
        chalk.cyan('>'), //
        ['Run', 'message'],
        chalk.cyan(command),
      );
      return this.execa(templates, ...expressions);
    }
  }
}
