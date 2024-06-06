import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import dedent from 'dedent';
import fs from 'fs-extra';
import core from '@actions/core';
import github from '@actions/github';
import { mockExecOutput } from './__tests__/mock-exec';
import { mockBaseBranchInput } from './setup/get-branches.test';
import { mockPackageFile } from './changes/get-diff-packages.test';
import { main } from './main';

// Shallow clone original @actions/github context
const originalContext = { ...github.context };

export function mockAll() {
  const baseBranch = 'dev';
  const headBranch = 'renovate/all-minor-patch';
  const packageFile = 'packages/foo/package.json';
  const changedLines = dedent`
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
  `;
  const diffFiles = dedent`
    package.json
    packages/foo/package.json
  `;
  const commitHash = '1234abcd';

  mockExecOutput({
    changedLines: { baseBranch, changedLines, packageFile },
    diffFiles: { baseBranch, diffFiles },
    shortCommitHash: { commitHash },
  });
  mockBaseBranchInput({ baseBranch, headBranch, eventName: 'pull_request' });
  mockPackageFile(packageFile, {
    name: 'foo',
    version: '1.0.0',
    dependencies: {
      bar: '^2.0.0',
    },
  });
  vi.spyOn(core, 'debug').mockImplementation(() => {});
  vi.spyOn(fs, 'writeFile').mockImplementation(() => {});
}

describe('main', () => {
  beforeEach(() => {
    vi.spyOn(core, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(github, 'context', { value: originalContext });
  });

  it('main', async () => {
    mockAll();

    await main();
  });
});
