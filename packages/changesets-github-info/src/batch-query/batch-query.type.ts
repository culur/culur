import type {
  CommitFragment,
  PullRequestFragment,
} from '~/types/schema.operations.generated';

export type GithubInfoRequest = { owner: string; name: string } & (
  | { commitHash: string }
  | { pullRequestNumber: number }
);

export interface GithubInfoRequestByRepo {
  [repo: `${string}/${string}`]: GithubInfoRequest[];
}

export type BatchGithubInfoResponse = {
  [key in `repo_${number}`]: {
    [commit in `commit_${string}`]: CommitFragment;
  } & {
    [pr in `pr_${number}`]: PullRequestFragment;
  };
};
