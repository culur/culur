import { info } from '@actions/core';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineMockGithubEvent } from '~/__tests__/mock-github-event';
import { getBranches } from './get-branches';

const { mockGithubEvent, restoreGithubEvent } = defineMockGithubEvent();

vi.mock('@actions/core', () => ({
  info: vi.fn(),
}));

describe('getBranches', async () => {
  afterEach(() => {
    vi.resetAllMocks();
    restoreGithubEvent();
  });

  it('valid', async () => {
    mockGithubEvent({
      eventName: 'pull_request',
      baseBranch: 'dev',
      headBranch: 'renovate/all-minor-patch',
    });

    const branches = await getBranches({
      input: {
        baseBranchPattern: 'dev',
        headBranchPattern: 'renovate/**',
        userEmail: '',
        userName: '',
      },
    });

    expect(branches.baseBranch).toStrictEqual('dev');
  });

  it('invalid event', async () => {
    mockGithubEvent({
      eventName: 'push',
      baseBranch: 'dev',
      headBranch: 'renovate/all-minor-patch',
    });

    await expect(() =>
      getBranches({
        input: {
          baseBranchPattern: 'dev',
          headBranchPattern: 'renovate/**',
          userName: '-',
          userEmail: '-',
        },
      }),
    ).rejects.toThrowError('process.exit unexpectedly called with "0"');
    expect(info).toBeCalledWith('Not pull request, skipping');
  });

  it('invalid base branch', async () => {
    mockGithubEvent({
      eventName: 'pull_request',
      baseBranch: '-',
      headBranch: 'renovate/all-minor-patch',
    });

    await expect(() =>
      getBranches({
        input: {
          baseBranchPattern: 'dev',
          headBranchPattern: 'renovate/**',
          userName: '-',
          userEmail: '-',
        },
      }),
    ).rejects.toThrowError('process.exit unexpectedly called with "0"');
    expect(info).nthCalledWith(1, 'Base branch: "-"');
    expect(info).nthCalledWith(2, 'Not valid base branch, skipping');
  });

  it('invalid head branch', async () => {
    mockGithubEvent({
      eventName: 'pull_request',
      baseBranch: 'dev',
      headBranch: 'feat/foo',
    });

    await expect(() =>
      getBranches({
        input: {
          baseBranchPattern: 'dev',
          headBranchPattern: 'renovate/**',
          userName: '-',
          userEmail: '-',
        },
      }),
    ).rejects.toThrowError('process.exit unexpectedly called with "0"');
    expect(info).nthCalledWith(1, 'Base branch: "dev"');
    expect(info).nthCalledWith(2, 'Head branch: "feat/foo"');
    expect(info).nthCalledWith(3, 'Not valid head branch, skipping');
  });
});
