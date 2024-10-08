import core from '@actions/core';
import dedent from 'dedent';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockDiffFiles } from '~/__tests__/mock-exec';
import { getDiffPackageFiles } from './get-diff-package-files';

describe('getDiffPackageFiles', () => {
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
