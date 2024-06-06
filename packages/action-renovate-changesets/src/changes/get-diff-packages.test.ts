import { afterEach, assert, describe, expect, it, vi } from 'vitest';
import type { PackageJson } from '@culur/types';
import fs from 'fs-extra';
import dedent from 'dedent';
import { getDiffPackages } from './get-diff-packages';
import * as module from './get-diff-package-files';
import { mockExecOutput } from '~/__tests__/mock-exec';

export function mockPackageFile(packageFile: string, json: PackageJson) {
  vi.spyOn(fs, 'readJson') //
    .mockImplementation(async command => (command === packageFile ? json : {}));
}

export function mockDiffPackageFiles(packageFile: string) {
  vi.spyOn(module, 'getDiffPackageFiles') //
    .mockImplementation(async () => [packageFile]);
}

const mockChangedLines = (
  baseBranch: string,
  packageFile: string,
  changedLines: string,
) =>
  mockExecOutput({ changedLines: { baseBranch, changedLines, packageFile } });

describe('getDiffPackages', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getDiffPackages', async () => {
    const baseBranch = 'dev';
    const packageFile = 'packages/foo/package.json';
    const headBranch = 'renovate/all-minor-patch';

    mockDiffPackageFiles(packageFile);
    mockPackageFile(packageFile, {
      name: 'foo',
      version: '1.0.0',
      dependencies: {
        bar: '^2.0.0',
      },
    });
    mockChangedLines(
      baseBranch,
      packageFile,
      dedent`
        diff --git a/packages/foo/package.json b/packages/foo/package.json
        index 1234abcd..abcd1234 123456
        --- a/packages/foo/package.json
        +++ b/packages/foo/package.json
        @@ -72,7 +72,7 @@
           "name": "foo",
           "version: "1.0.0",
           "dependencies": {
        -    "bar": "^1.0.0",
        +    "bar": "^2.0.0",
           },
           "devDependencies": {
             "bar-dev": "1.0.0",
      `,
    );

    const diffPackages = await getDiffPackages({ baseBranch, headBranch });
    expect(diffPackages).toHaveLength(1);

    const [{ changedPackages }] = diffPackages;
    assert('dependencies' in changedPackages);
    assert(changedPackages.dependencies !== undefined);

    expect(changedPackages.dependencies.bar).toStrictEqual('^2.0.0');
  });
});
