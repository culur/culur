import process from 'node:process';
import core from '@actions/core';
import github from '@actions/github';
import { minimatch } from 'minimatch';
import type { PullRequestEvent } from '@octokit/webhooks-types';
import type { Input } from './get-input';

export async function getBranches({ input }: { input: Input }) {
  if (github.context.eventName !== 'pull_request') {
    core.info('Not pull request, skipping');
    process.exit(0);
  }

  const event = github.context.payload as PullRequestEvent;
  const baseBranch = event.pull_request.base.ref;
  const headBranch = event.pull_request.head.ref;

  core.info(`Base branch: "${baseBranch}"`);
  if (!minimatch(baseBranch, input.baseBranchPattern)) {
    core.info('Not valid base branch, skipping');
    process.exit(0);
  }

  core.info(`Head branch: "${headBranch}"`);
  if (!minimatch(headBranch, input.headBranchPattern)) {
    core.info('Not valid head branch, skipping');
    process.exit(0);
  }

  return {
    baseBranch,
    headBranch,
  };
}

export type Branches = Awaited<ReturnType<typeof getBranches>>;
