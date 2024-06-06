import process from 'node:process';
import core from '@actions/core';
import github from '@actions/github';
import type { PullRequestEvent } from '@octokit/webhooks-definitions/schema';

export async function getBranches() {
  const event = github.context.payload as PullRequestEvent;
  const baseBranch = event.pull_request.base.ref;
  const headBranch = event.pull_request.head.ref;

  core.debug(`Base branch: "${baseBranch}"`);
  core.debug(`Current branch: "${headBranch}"`);

  if (github.context.eventName !== 'pull_request') {
    core.info('Not pull request, skipping');
    process.exit(0);
  }

  if (!headBranch.startsWith('renovate/')) {
    core.info('Not a renovate branch, skipping');
    process.exit(0);
  }

  return { baseBranch, headBranch };
}

export type Branches = Awaited<ReturnType<typeof getBranches>>;
