import assert from 'assert';
import fsExtra from 'fs-extra';
import GitHost from 'hosted-git-info';
import { resolve } from 'path';
import { DirectoryInput } from '~/input/directory';
import { formatCode } from '../utils/prettier';

export class FileLib {
  public readonly projectDir: string;
  public readonly templateDir: string;

  public constructor(dirname: string, dir: DirectoryInput) {
    this.projectDir = dir.projectDir;
    this.templateDir = resolve(dirname, 'template');
  }

  public async read(file: string) {
    const contentString = //
      await fsExtra.readFile(resolve(this.projectDir, file), 'utf-8');

    return contentString;
  }

  public async write(file: string, content: string | object) {
    const contentString =
      typeof content === 'object'
        ? JSON.stringify(content, undefined, 2)
        : content;

    const formattedContent = await formatCode(file, contentString);

    await fsExtra.writeFile(resolve(this.projectDir, file), formattedContent);
  }

  public async copyFromTemplate(srcFile: string, destFile?: string) {
    return await fsExtra.copy(
      resolve(this.templateDir, srcFile),
      resolve(this.projectDir, destFile ?? srcFile),
    );
  }

  public async downloadAndWrite(
    gitUrl: `${string}/${string}` | `${GitHost.Hosts}:${string}/${string}`,
    gitFile: string,
    destFile?: string,
  ) {
    const repo = GitHost.fromUrl(gitUrl);
    assert(repo);

    const fileUrl = repo.file(gitFile);
    const response = await fetch(fileUrl);
    const content = await response.text();

    await this.write(destFile ?? gitFile, content);
  }
}
