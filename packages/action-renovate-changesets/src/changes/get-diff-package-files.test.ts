import { afterEach, describe, expect, it, vi } from 'vitest';
import core from '@actions/core';
import dedent from 'dedent';
import { getDiffPackageFiles } from './get-diff-package-files';
import { mockExecOutput } from '~/__tests__/mock-exec';

const mockDiffFiles = (baseBranch: string, diffFiles: string) =>
  mockExecOutput({ diffFiles: { baseBranch, diffFiles } });

describe('getDiffFiles', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('valid diff package files', async () => {
    const baseBranch = 'dev';
    const headBranch = 'renovate/all-minor-patch';

    mockDiffFiles(
      baseBranch,
      dedent`
        package.json
        packages/foo/package.json
        packages/bar/package.json
      `,
    );

    const diffFiles = await getDiffPackageFiles({ baseBranch, headBranch });
    expect(diffFiles).toBeTypeOf('object');
    expect(diffFiles).toHaveLength(2);
  });

  it('changeset already exists', async () => {
    const baseBranch = 'dev';
    const headBranch = 'renovate/all-minor-patch';

    const coreInfo = vi.spyOn(core, 'info');

    mockDiffFiles(
      baseBranch,
      dedent`
        .changeset/abc.md
        packages/foo/package.json
      `,
    );

    await expect(() => getDiffPackageFiles({ baseBranch, headBranch })) //
      .rejects.toThrowError('process.exit unexpectedly called with "0"');
    expect(coreInfo).toBeCalledWith('Changeset already exists, skipping');
  });

  it('no package.json', async () => {
    const baseBranch = 'dev';
    const headBranch = 'renovate/all-minor-patch';

    const coreInfo = vi.spyOn(core, 'info');

    mockDiffFiles(
      baseBranch,
      dedent`
        package.json
      `,
    );

    await expect(() => getDiffPackageFiles({ baseBranch, headBranch })) //
      .rejects.toThrowError('process.exit unexpectedly called with "0"');
    expect(coreInfo).toBeCalledWith(
      'No package.json changes to published packages, skipping',
    );
  });
});
