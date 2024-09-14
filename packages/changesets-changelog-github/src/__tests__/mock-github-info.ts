import type { MockRecord } from './types';
import * as githubInfo from '@culur/changesets-github-info';
import { assert, vi } from 'vitest';
import { getCommit, getPull, getUser } from './mock-links';

export const mockGithubInfo = (...records: MockRecord[]) => {
  vi.spyOn(githubInfo, 'getCommitInfo').mockImplementation(
    async ({ repo, commitHash }) => {
      const record = records.find(
        r => r.repo === repo && r.commitHash === commitHash,
      );
      assert(!!record && !!record.commitHash);

      return {
        user: getUser(record),
        commit: getCommit(record),
        pullRequest: record.pullRequestNumber ? getPull(record) : null,
      };
    },
  );

  vi.spyOn(githubInfo, 'getPullRequestInfo').mockImplementation(
    async ({ repo, pullRequestNumber }) => {
      const record = records.find(
        record =>
          record.pullRequestNumber === pullRequestNumber &&
          record.repo === repo,
      );
      assert(!!record && !!record.pullRequestNumber);

      return {
        user: getUser(record),
        commit: record.commitHash ? getCommit(record) : null,
        pullRequest: getPull(record),
      };
    },
  );
};
