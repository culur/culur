import type { PullRequestEvent } from '@octokit/webhooks-types';
import type { Input } from './get-input';
import process from 'node:process';
import { info } from '@actions/core';
import { context } from '@actions/github';
import { minimatch } from 'minimatch';

export async function getBranches({ input }: { input: Input }) {
  if (context.eventName !== 'pull_request') {
    info('Not pull request, skipping');
    process.exit(0);
  }

  const event = context.payload as PullRequestEvent;
  const baseBranch = event.pull_request.base.ref;
  const headBranch = event.pull_request.head.ref;

  info(`Base branch: "${baseBranch}"`);
  if (!minimatch(baseBranch, input.baseBranchPattern)) {
    info('Not valid base branch, skipping');
    process.exit(0);
  }

  info(`Head branch: "${headBranch}"`);
  if (!minimatch(headBranch, input.headBranchPattern)) {
    info('Not valid head branch, skipping');
    process.exit(0);
  }

  return {
    baseBranch,
    headBranch,
  };
}

export type Branches = Awaited<ReturnType<typeof getBranches>>;
