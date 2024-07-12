import { expectTypeOf, it } from 'vitest';
import * as getInfo from '.';

it('config esm', () => {
  interface User {
    name: string;
    link: string;
  }
  interface Commit {
    hash: string;
    message: string;
    link: string;
  }
  interface PullRequest {
    number: number;
    title: string;
    link: string;
  }

  expectTypeOf(getInfo).toMatchTypeOf<{
    getCommitInfo: (props: {
      repo: `${string}/${string}`;
      commitHash: string;
    }) => Promise<{
      user: User | null;
      commit: Commit;
      pullRequest: PullRequest | null;
    }>;
    getPullRequestInfo: (props: {
      repo: `${string}/${string}`;
      pullRequestNumber: number;
    }) => Promise<{
      user: User | null;
      commit: Commit | null;
      pullRequest: PullRequest;
    }>;
  }>();
});
