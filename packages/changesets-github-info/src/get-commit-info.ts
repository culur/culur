import assert from 'node:assert';
import { batchQueryDataLoader } from './batch-query/batch-query';
import { validRepoNameRegex } from './repo-name-regex';

export async function getCommitInfo({
  repo,
  commitHash,
}: {
  repo: `${string}/${string}`;
  commitHash: string;
}) {
  if (!commitHash) {
    throw new Error('Please pass a commit SHA to getInfo');
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

  const commitData = await batchQueryDataLoader.load({
    owner,
    name,
    commitHash,
  });
  assert(commitData.__typename === 'Commit');

  const mergedPullRequest = commitData.associatedPullRequests?.nodes
    ?.filter(
      (node): node is NonNullable<typeof node> & { mergedAt: string } =>
        !!node && !!node.mergedAt,
    )
    ?.sort((a, b) => {
      const dateA = new Date(a.mergedAt);
      const dateB = new Date(b.mergedAt);
      return Number(dateA) - Number(dateB);
    })[0];

  const user = mergedPullRequest?.author ?? commitData.author?.user ?? null;

  if (user) {
    const login = user.login.replace(/\[bot\]$/, '');
    if (user.login !== login) {
      user.login = login;
      user.url = `https://github.com/apps/${login}`;
    }
  }

  return {
    user: user
      ? {
          name: user.login,
          link: `[@${user.login}](${user.url})`,
        }
      : null,
    commit: {
      hash: commitHash,
      message: commitData.message,
      link: `[\`${commitHash.slice(0, 7)}\`](${commitData.commitUrl})`,
    },
    pullRequest: mergedPullRequest
      ? {
          number: mergedPullRequest.number,
          title: mergedPullRequest.title,
          link: `[#${mergedPullRequest.number}](${mergedPullRequest.url})`,
        }
      : null,
  };
}
