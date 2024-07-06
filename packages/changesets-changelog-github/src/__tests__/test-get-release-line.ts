import { expect, it } from 'vitest';
import { getReleaseLineProps } from './get-release-line-props';
import type { GithubInfo } from './github-info';
import { mockGithubInfo } from './mock-get-github-info';
import { getReleaseLine } from '~/get-release-line';

export const testGetReleaseLine = (
  name: string,
  githubInfo: GithubInfo,
  summary: string,
  expectReleaseLine: string,
  options?: { only: boolean },
) => {
  // eslint-disable-next-line test/no-only-tests
  return (options?.only ? it.only : it)(name, async () => {
    mockGithubInfo(githubInfo);

    const props = getReleaseLineProps(githubInfo, summary);
    const releaseLine = await getReleaseLine(...props);

    expect(releaseLine).toEqual(`\n\n${expectReleaseLine}\n`);
  });
};
