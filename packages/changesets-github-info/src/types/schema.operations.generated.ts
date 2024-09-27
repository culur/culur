export interface PullRequestFragment {
  __typename: 'PullRequest';
  title: string;
  url: string;
  author?:
    | { __typename?: 'Bot'; login: string; url: string }
    | { __typename?: 'EnterpriseUserAccount'; login: string; url: string }
    | { __typename?: 'Mannequin'; login: string; url: string }
    | { __typename?: 'Organization'; login: string; url: string }
    | { __typename?: 'User'; login: string; url: string }
    | null;
  mergeCommit?: {
    __typename?: 'Commit';
    oid: string;
    message: string;
    commitUrl: string;
  } | null;
}

export interface CommitFragment {
  __typename: 'Commit';
  oid: string;
  message: string;
  commitUrl: string;
  author?: {
    __typename?: 'GitActor';
    user?: { __typename?: 'User'; login: string; url: string } | null;
  } | null;
  associatedPullRequests?: {
    __typename?: 'PullRequestConnection';
    nodes?: Array<{
      __typename?: 'PullRequest';
      number: number;
      title: string;
      url: string;
      mergedAt?: string | null;
      author?:
        | { __typename?: 'Bot'; login: string; url: string }
        | { __typename?: 'EnterpriseUserAccount'; login: string; url: string }
        | { __typename?: 'Mannequin'; login: string; url: string }
        | { __typename?: 'Organization'; login: string; url: string }
        | { __typename?: 'User'; login: string; url: string }
        | null;
    } | null> | null;
  } | null;
}
