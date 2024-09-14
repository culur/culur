import type { MockRecord } from './types';
import { assert } from 'vitest';
import { getCommit, getPull, getUser } from './mock-links';

export const changesetsGithubInfo = (
  ...mockRecords: MockRecord[]
): Awaited<typeof import('@culur/changesets-github-info')> => ({
  async getCommitInfo({ repo, commitHash }) {
    const record = mockRecords.find(
      r => r.repo === repo && r.commitHash === commitHash,
    );
    assert(!!record && !!record.commitHash, 'not found mock record');
    return {
      user: getUser(record),
      commit: getCommit(record),
      pullRequest: record.pullRequestNumber ? getPull(record) : null,
    };
  },
  async getPullRequestInfo({ repo, pullRequestNumber }) {
    const record = mockRecords.find(
      record =>
        record.pullRequestNumber === pullRequestNumber && record.repo === repo,
    );
    assert(!!record && !!record.pullRequestNumber, 'not found mock record');
    return {
      user: getUser(record),
      commit: record.commitHash ? getCommit(record) : null,
      pullRequest: getPull(record),
    };
  },
});
