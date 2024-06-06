import { afterEach, describe, expect, it, vi } from 'vitest';
import { getShortCommitHash } from './get-short-commit-hash';
import { mockExecOutput } from '~/__tests__/mock-exec';

const mockShortCommitHash = (commitHash: string) =>
  mockExecOutput({ shortCommitHash: { commitHash } });

describe('getShortCommitHash', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('valid branch', async () => {
    mockShortCommitHash('1234abcd');

    const shortCommitHash = await getShortCommitHash();
    expect(shortCommitHash).toEqual('1234abcd');
  });
});
