import { defaultsDeep, pick } from 'lodash-es';
import { PackageJson } from 'type-fest';
import { FileLib } from './file';
import { sortObject } from '~/utils/object';

export class PackageJsonLib {
  public constructor(
    private file: FileLib,
    private packageJson: PackageJson = {},
  ) {
    this.file = file;
  }

  public async read() {
    const contentString = await this.file.read('package.json');
    this.packageJson = JSON.parse(contentString);
  }

  public append(packageJson_: PackageJson) {
    this.packageJson = defaultsDeep(this.packageJson, packageJson_);
    this.packageJson.dependencies = sortObject(this.packageJson.dependencies);
    this.packageJson.devDependencies = sortObject(
      this.packageJson.devDependencies,
    );
    return this;
  }

  public async write() {
    await this.file.write('package.json', this.packageJson);
  }
}
