import type { Branches } from '~/input/get-branches';
import github from '@actions/github';

export function defineMockGithubEvent() {
  // Shallow clone original @actions/github context
  const originalContext = { ...github.context };

  function mockGithubEvent({
    baseBranch,
    headBranch,
    eventName,
  }: Branches & { eventName: string }) {
    Object.defineProperty(github, 'context', {
      value: {
        eventName,
        payload: {
          pull_request: {
            base: { ref: baseBranch },
            head: { ref: headBranch },
          },
        },
      },
    });
  }

  function restoreGithubEvent() {
    Object.defineProperty(github, 'context', { value: originalContext });
  }

  return { mockGithubEvent, restoreGithubEvent };
}
