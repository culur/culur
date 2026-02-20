import type { Branches } from '~/input/get-branches';
import { context } from '@actions/github';

export function defineMockGithubEvent() {
  // Shallow clone original @actions/github context
  const originalContext = { ...context };

  function mockGithubEvent({
    baseBranch,
    headBranch,
    eventName,
  }: Branches & { eventName: string }) {
    Object.assign(context, {
      eventName,
      payload: {
        pull_request: {
          base: { ref: baseBranch },
          head: { ref: headBranch },
        },
      },
    });
  }

  function restoreGithubEvent() {
    for (const key of Object.keys(context)) delete (context as any)[key];
    Object.assign(context, originalContext);
  }

  return { mockGithubEvent, restoreGithubEvent };
}
