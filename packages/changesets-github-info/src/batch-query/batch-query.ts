import process from 'node:process';
import { keys } from '@culur/types';
import dedent from 'dedent';
import DataLoader from 'dataloader';
import { commit, pullRequest } from './batch-query.fragments';
import type {
  BatchGithubInfoResponse,
  GithubInfoRequest,
  GithubInfoRequestByRepo,
} from './batch-query.type';

const gql = dedent;

const getCommitOrPrQuery = (request: GithubInfoRequest) =>
  'commitHash' in request
    ? dedent`
        commit_${request.commitHash}: object(expression: "${request.commitHash}") {
          ...commit
        }
      `
    : dedent`
        pr_${request.pullRequestNumber}: pullRequest(number: ${request.pullRequestNumber}) {
          ...pullRequest
        }
      `;

const getRepositoryQuery = (
  repo: `${string}/${string}`,
  index: number,
  requests: GithubInfoRequest[],
) => {
  const [owner, name] = repo.split('/');
  return dedent`
    repo_${index}: repository(owner: "${owner}", name: "${name}") {
      ${requests.map(getCommitOrPrQuery).join('\n')}
    }
  `;
};

export const getQuery = async (requests: readonly GithubInfoRequest[]) => {
  const { groupBy } = await import('lodash-es');
  const requestsByRepo: GithubInfoRequestByRepo = groupBy(
    requests,
    req => `${req.owner}/${req.name}`,
  );
  const repos = keys(requestsByRepo);

  const hasCommit = requests.some(
    r => 'commitHash' in r && typeof r.commitHash === 'string',
  );
  const hasPullRequest = requests.some(
    r => 'pullRequestNumber' in r && typeof r.pullRequestNumber === 'number',
  );

  const query = gql`
    query {
      ${keys(requestsByRepo)
        .map((repo, index) =>
          getRepositoryQuery(repo, index, requestsByRepo[repo]),
        )
        .join('\n')}
    }
    ${hasCommit ? commit : ''}
    ${hasPullRequest ? pullRequest : ''}
  `;

  return { query, repos };
};

export const batchQuery = async (requests: readonly GithubInfoRequest[]) => {
  const { graphql, GraphqlResponseError } = await import('@octokit/graphql');
  try {
    const { query, repos } = await getQuery(requests);

    const response = await graphql<BatchGithubInfoResponse>(query, {
      headers: { authorization: `token ${process.env.GITHUB_TOKEN}` },
    });

    if (!response) {
      throw new Error('An error occurred when fetching data from GitHub');
    }

    return requests.map(request => {
      const index = repos.indexOf(`${request.owner}/${request.name}`);
      const repo = response[`repo_${index}`];

      if ('commitHash' in request) {
        return repo[`commit_${request.commitHash}`];
      } else {
        return repo[`pr_${request.pullRequestNumber}`];
      }
    });
  } catch (error) {
    if (error instanceof GraphqlResponseError) {
      const errorMessage = `An error occurred when fetching data from GitHub:\n${JSON.stringify(
        error?.errors,
        null,
        2,
      )}`;

      throw new TypeError(errorMessage);
    }
    throw new Error('An error occurred when fetching data from GitHub');
  }
};

export const batchQueryDataLoader = new DataLoader(batchQuery);
