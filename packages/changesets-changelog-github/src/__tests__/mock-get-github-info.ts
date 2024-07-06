import { assert, expect, vi } from 'vitest';
import * as getGithubInfo from '@changesets/get-github-info';
import type { GithubInfo } from './github-info';

function getLinks<TData extends GithubInfo>(data: TData) {
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

export const mockGithubInfo = (githubInfo: GithubInfo) => {
  vi.spyOn(getGithubInfo, 'getInfo').mockImplementation(
    async ({ commit, repo }) => {
      expect(commit).toBe(githubInfo.commit);
      expect(repo).toBe(githubInfo.repo);
      assert(githubInfo.commit !== null);

      return {
        user: githubInfo.user,
        pull: githubInfo.pull,
        links: getLinks(githubInfo),
      };
    },
  );
  vi.spyOn(getGithubInfo, 'getInfoFromPullRequest').mockImplementation(
    async ({ pull, repo }) => {
      if (githubInfo.pull !== null) expect(pull).toBe(githubInfo.pull);
      expect(repo).toBe(githubInfo.repo);
      assert(githubInfo.pull !== null);

      return {
        commit: githubInfo.commit,
        user: githubInfo.user,
        links: getLinks(githubInfo),
      };
    },
  );
};
