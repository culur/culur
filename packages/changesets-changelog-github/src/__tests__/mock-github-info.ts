import * as getGithubInfo from '@changesets/get-github-info';
import { defineObject } from '@culur/types';
import { assert, vi } from 'vitest';

export type CommitOrPullRecord = {
  repo: string;
  user: string;
} & ({ commit: string } | { commit: null }) &
  ({ pull: number } | { pull: null });

export const defineCommitOrPullRecord = defineObject<CommitOrPullRecord>();

function getLinks<TData extends CommitOrPullRecord>(data: TData) {
  const user = data.user
    ? `[@${data.user}](https://github.com/${data.user})`
    : null;

  const pull = (
    typeof data.pull === 'number'
      ? `[#${data.pull}](https://github.com/${data.repo}/pull/${data.pull})`
      : null
  ) as TData['pull'] extends number ? string : null;

  const commit = (
    data.commit !== null
      ? `[\`${data.commit}\`](https://github.com/${data.repo}/commit/${data.commit})`
      : null
  ) as TData['commit'];

  return { user, pull, commit };
}

export const mockGithubInfo = (
  ...commitOrPullRecords: CommitOrPullRecord[]
) => {
  vi.spyOn(getGithubInfo, 'getInfo').mockImplementation(
    async ({ commit, repo }) => {
      const record = commitOrPullRecords.find(
        record => record.commit === commit && record.repo === repo,
      );
      assert(!!record && !!record.commit);

      return {
        user: record.user,
        pull: record.pull,
        links: getLinks(record),
      };
    },
  );
  vi.spyOn(getGithubInfo, 'getInfoFromPullRequest').mockImplementation(
    async ({ pull, repo }) => {
      const record = commitOrPullRecords.find(
        record => record.pull === pull && record.repo === repo,
      );
      assert(!!record && !!record.pull);

      return {
        commit: record.commit,
        user: record.user,
        links: getLinks(record),
      };
    },
  );
};
