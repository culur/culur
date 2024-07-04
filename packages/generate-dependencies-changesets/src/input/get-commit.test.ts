import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCommit } from './get-commit';
import { mockCommitHash } from '~/__tests__/mock-exec';

describe('getCommit', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('valid commit', async () => {
    mockCommitHash('1234abcd');

    const { hash } = await getCommit();
    expect(hash).toEqual('1234abcd');
  });
});
