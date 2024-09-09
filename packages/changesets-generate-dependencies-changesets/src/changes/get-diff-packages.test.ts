import dedent from 'dedent';
import { afterEach, assert, describe, expect, it, vi } from 'vitest';
import { mockChangedLines } from '~/__tests__/mock-exec';
import {
  mockDiffPackageFiles,
  mockPackageFile,
} from '~/__tests__/mock-package';
import { getDiffPackages } from './get-diff-packages';

describe('getDiffPackages', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('valid', async () => {
    const baseBranch = 'dev';
    const headBranch = 'renovate/all-minor-patch';
    const packageFile = 'packages/foo/package.json';

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

    const diffPackages = await getDiffPackages({
      branches: { baseBranch, headBranch },
    });
    expect(diffPackages).toHaveLength(1);

    const [{ changedPackages }] = diffPackages;
    assert('dependencies' in changedPackages);
    assert(changedPackages.dependencies !== undefined);

    expect(changedPackages.dependencies.bar).toStrictEqual('^2.0.0');
  });
});
