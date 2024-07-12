import { defineObject } from '@culur/types';

export interface MockRecordBase {
  repo: string;
  user: string;
}

export type MockRecordCommit =
  | { commitHash: string; commitMessage: string }
  | { commitHash?: undefined; commitMessage?: undefined };

export type MockRecordPullRequest =
  | { pullRequestNumber: number; pullRequestTitle: string }
  | { pullRequestNumber?: undefined; pullRequestTitle?: undefined };

export type MockRecord = MockRecordBase &
  MockRecordCommit &
  MockRecordPullRequest;

export const defineMockRecord = defineObject<MockRecord>();
