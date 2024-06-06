import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import core from '@actions/core';
import github from '@actions/github';
import type { Branches } from './get-branches';
import { getBranches } from './get-branches';

// Shallow clone original @actions/github context
const originalContext = { ...github.context };

export function mockBaseBranchInput({
  baseBranch,
  headBranch,
  eventName,
}: Branches & { eventName: string }) {
  Object.defineProperty(github, 'context', {
    value: {
      eventName,
      payload: {
        pull_request: {
          base: { ref: baseBranch },
          head: { ref: headBranch },
        },
      },
    },
  });
}

describe('getInput', async () => {
  beforeEach(() => {
    vi.spyOn(core, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(github, 'context', { value: originalContext });
  });

  it('valid', async () => {
    mockBaseBranchInput({
      eventName: 'pull_request',
      baseBranch: 'dev',
      headBranch: 'renovate/all-minor-patch',
    });

    const branches = await getBranches();
    expect(branches.baseBranch).toStrictEqual('dev');
  });

  it('invalid event', async () => {
    const coreInfo = vi.spyOn(core, 'info').mockImplementation(() => {});
    mockBaseBranchInput({
      eventName: 'push',
      baseBranch: 'dev',
      headBranch: 'renovate/all-minor-patch',
    });

    await expect(getBranches) //
      .rejects.toThrowError('process.exit unexpectedly called with "0"');
    expect(coreInfo).toBeCalledWith('Not pull request, skipping');
  });

  it('invalid branch', async () => {
    const coreInfo = vi.spyOn(core, 'info').mockImplementation(() => {});
    mockBaseBranchInput({
      eventName: 'pull_request',
      baseBranch: 'dev',
      headBranch: 'feat/foo',
    });

    await expect(getBranches) //
      .rejects.toThrowError('process.exit unexpectedly called with "0"');
    expect(coreInfo).toBeCalledWith('Not a renovate branch, skipping');
  });
});
