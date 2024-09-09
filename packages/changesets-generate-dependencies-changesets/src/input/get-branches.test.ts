import core from '@actions/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineMockGithubEvent } from '~/__tests__/mock-github-event';
import { getBranches } from './get-branches';

const { mockGithubEvent, restoreGithubEvent } = defineMockGithubEvent();

describe('getBranches', async () => {
  beforeEach(() => {
    vi.spyOn(core, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    const coreInfo = vi.spyOn(core, 'info').mockImplementation(() => {});
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
    expect(coreInfo).toBeCalledWith('Not pull request, skipping');
  });

  it('invalid base branch', async () => {
    const coreInfo = vi.spyOn(core, 'info').mockImplementation(() => {});
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
    expect(coreInfo).nthCalledWith(1, 'Base branch: "-"');
    expect(coreInfo).nthCalledWith(2, 'Not valid base branch, skipping');
  });

  it('invalid head branch', async () => {
    const coreInfo = vi.spyOn(core, 'info').mockImplementation(() => {});
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
    expect(coreInfo).nthCalledWith(1, 'Base branch: "dev"');
    expect(coreInfo).nthCalledWith(2, 'Head branch: "feat/foo"');
    expect(coreInfo).nthCalledWith(3, 'Not valid head branch, skipping');
  });
});
