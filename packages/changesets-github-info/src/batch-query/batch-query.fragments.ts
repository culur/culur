import dedent from 'dedent';

const gql = dedent;

export const pullRequest = gql`
  fragment pullRequest on PullRequest {
    __typename
    title
    url
    author {
      login
      url
    }
    mergeCommit {
      oid
      message
      commitUrl
    }
  }
`;

export const commit = gql`
  fragment commit on Commit {
    __typename
    oid
    message
    commitUrl
    author {
      user {
        login
        url
      }
    }
    associatedPullRequests(
      first: 10
      orderBy: { direction: ASC, field: UPDATED_AT }
    ) {
      nodes {
        number
        title
        url
        mergedAt
        author {
          login
          url
        }
      }
    }
  }
`;
