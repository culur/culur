import type { MockRecord, MockRecordBase } from './types';

export const getUser = ({ user }: MockRecordBase) =>
  user ? { name: user, link: `[@${user}](https://github.com/${user})` } : null;

export const getCommit = ({
  repo,
  commitHash: hash,
  commitMessage: message,
}: Extract<MockRecord, { commitHash: string }>) => ({
  hash,
  message,
  link: `[\`${hash}\`](https://github.com/${repo}/commit/${hash})`,
});

export const getPull = ({
  repo,
  pullRequestNumber: number,
  pullRequestTitle: title,
}: Extract<MockRecord, { pullRequestNumber: number }>) => ({
  number,
  title,
  link: `[#${number}](https://github.com/${repo}/pull/${number})`,
});
