import { ExecLib } from './exec';
import { FileLib } from './file';
import { PackageJsonLib } from './package-json';
import { GitLib } from './git';
import type { Input } from '~/input/input';

export class Lib {
  public file: FileLib;
  public packageJson: PackageJsonLib;
  public exec: ExecLib;
  public git: GitLib;

  constructor({ input, dirname }: { input: Input; dirname: string }) {
    this.file = new FileLib(dirname, input.dir);
    this.packageJson = new PackageJsonLib(this.file);
    this.exec = new ExecLib(input.dir);
    this.git = new GitLib(input);
  }
}
