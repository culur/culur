import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockCommitHash } from '~/__tests__/mock-exec';
import { getCommit } from './get-commit';

describe('getCommit', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('valid commit', async () => {
    mockCommitHash('1234abcd');

    const { hash } = await getCommit();
    expect(hash).toEqual('1234abcd');
  });
});
