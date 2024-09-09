import core from '@actions/core';
import dedent from 'dedent';
import fs from 'fs-extra';
import { vi } from 'vitest';
import { mockExecOutput } from './mock-exec';
import { defineMockGithubEvent } from './mock-github-event';
import { mockInput } from './mock-input';
import { mockPackageFile } from './mock-package';

const { mockGithubEvent, restoreGithubEvent } = defineMockGithubEvent();

async function mockWriteFile() {}
mockWriteFile.__promisify__ = async () => {};

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
  const hash = '1234abcd';

  mockInput({
    baseBranchPattern: 'dev',
    headBranchPattern: 'renovate/**',
    userName: 'renovate[bot]',
    userEmail: 'renovate[bot]@users.noreply.github.com',
  });
  mockExecOutput({
    changedLines: { baseBranch, changedLines, packageFile },
    diffFiles: { baseBranch, diffFiles },
    commit: { hash },
  });
  mockGithubEvent({
    baseBranch,
    headBranch,
    eventName: 'pull_request',
  });
  mockPackageFile(packageFile, {
    name: 'foo',
    version: '1.0.0',
    dependencies: {
      bar: '^2.0.0',
    },
  });

  vi.spyOn(core, 'debug').mockImplementation(() => {});
  vi.spyOn(fs, 'writeFile').mockImplementation(mockWriteFile);
}

export function restoreAll() {
  restoreGithubEvent();
}
