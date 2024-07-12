import assert from 'node:assert';
import { batchQueryDataLoader } from './batch-query/batch-query';
import { validRepoNameRegex } from './repo-name-regex';

export async function getPullRequestInfo({
  repo,
  pullRequestNumber,
}: {
  repo: `${string}/${string}`;
  pullRequestNumber: number;
}) {
  if (pullRequestNumber === undefined) {
    throw new Error('Please pass a pull request number');
  }

  if (!repo) {
    throw new Error(
      'Please pass a GitHub repository in the form of userOrOrg/repoName to getInfo',
    );
  }

  if (!validRepoNameRegex.test(repo)) {
    throw new Error(
      `Please pass a valid GitHub repository in the form of userOrOrg/repoName to getInfo (it has to match the "${validRepoNameRegex.source}" pattern)`,
    );
  }

  const [owner, name] = repo.split('/');

  const pullRequestData = await batchQueryDataLoader.load({
    owner,
    name,
    pullRequestNumber,
  });
  assert(pullRequestData.__typename === 'PullRequest');

  const user = pullRequestData.author;
  const commit = pullRequestData.mergeCommit;

  return {
    user: user
      ? {
          name: user.login,
          link: `[@${user.login}](${user.url})`,
        }
      : null,
    commit: commit
      ? {
          hash: commit.oid,
          message: commit.message,
          link: `[\`${commit.oid.slice(0, 7)}\`](${commit.commitUrl})`,
        }
      : null,
    pullRequest: {
      number: pullRequestNumber,
      title: pullRequestData.title,
      link: `[#${pullRequestNumber}](${pullRequestData.url})`,
    },
  };
}
