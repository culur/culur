/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export interface PullRequestFragment {
  __typename: 'PullRequest';
  title: string;
  url: string;
  author:
    | { login: string; url: string }
    | { login: string; url: string }
    | { login: string; url: string }
    | { login: string; url: string }
    | { login: string; url: string }
    | null;
  mergeCommit: { oid: string; message: string; commitUrl: string } | null;
}

export interface CommitFragment {
  __typename: 'Commit';
  oid: string;
  message: string;
  commitUrl: string;
  author: { user: { login: string; url: string } | null } | null;
  associatedPullRequests: {
    nodes: Array<{
      number: number;
      title: string;
      url: string;
      mergedAt: string | null;
      author:
        | { login: string; url: string }
        | { login: string; url: string }
        | { login: string; url: string }
        | { login: string; url: string }
        | { login: string; url: string }
        | null;
    } | null> | null;
  } | null;
}
