import type { GetReleaseLine } from '@changesets/types';
import {
  getCommitInfo,
  getPullRequestInfo,
} from '@culur/changesets-github-info';
import { getEmoji } from './get-emoji';

export const getReleaseLine: GetReleaseLine = async (
  changeset,
  type,
  options,
) => {
  if (!options || !options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["@culur/changesets-changelog-github", { "repo": "org/repo" }]',
    );
  }

  let pullRequestFromSummary: number | undefined;
  let commitFromSummary: string | undefined;
  const commitFromChangeset = changeset.commit;
  const usersFromSummary: string[] = [];

  const replacedChangelog = changeset.summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      const num = Number(pr);
      /* v8 ignore else -- @preserve */
      if (!Number.isNaN(num)) pullRequestFromSummary = num;
      return '';
    })
    .replace(/^\s*commit:\s*(\S+)/im, (_, commit) => {
      commitFromSummary = commit;
      return '';
    })
    .replace(/^\s*(?:author|user):\s*@?(\S+)/gim, (_, user) => {
      usersFromSummary.push(user);
      return '';
    })
    .trim();

  const [firstLine, ...restLines] = replacedChangelog
    .split('\n')
    .map(l => l.trimEnd());

  const links = await (async () => {
    const pullRequestFromSummaryInfo = pullRequestFromSummary
      ? await getPullRequestInfo({
          repo: options.repo,
          pullRequestNumber: pullRequestFromSummary,
        })
      : null;
    const commitFromChangesetInfo = commitFromChangeset
      ? await getCommitInfo({
          repo: options.repo,
          commitHash: commitFromChangeset,
        })
      : null;
    const commitFromSummaryInfo = commitFromSummary
      ? await getCommitInfo({
          repo: options.repo,
          commitHash: commitFromSummary,
        })
      : null;

    if (pullRequestFromSummaryInfo) {
      if (!commitFromSummaryInfo) return pullRequestFromSummaryInfo;
      return commitFromSummaryInfo;
    }
    return (
      commitFromSummaryInfo ??
      commitFromChangesetInfo ?? {
        user: null,
        commit: null,
        pullRequest: null,
      }
    );
  })();

  const users = usersFromSummary.length
    ? usersFromSummary
        .map(
          userFromSummary =>
            `[@${userFromSummary}](https://github.com/${userFromSummary})`,
        )
        .join(' ')
    : (links.user?.link ?? null);

  const prefix = getEmoji(links.pullRequest?.title ?? links.commit?.message);

  const suffix = [
    links.pullRequest !== null || links.commit !== null
      ? `(${[links.pullRequest?.link, links.commit?.link]
          .filter((item): item is string => !!item)
          .join(' ')})`
      : null,
    users !== null ? `(${users})` : null,
  ]
    .filter((item): item is string => !!item)
    .join(' ');

  const firstLineLastChar = firstLine.slice(-1);
  const firstLinePunctuation =
    firstLineLastChar === '.' || firstLineLastChar === ':'
      ? firstLineLastChar
      : null;
  const firstLineWithoutPunctuation = firstLinePunctuation
    ? firstLine.slice(0, -1)
    : firstLine;

  const restLinesContent = ['', ...restLines.map(l => `  ${l}`)].join('\n');

  return `\n\n- ${prefix} ${firstLineWithoutPunctuation}${suffix ? ` ${suffix}` : ''}${firstLinePunctuation ?? '.'}${restLinesContent}\n`;
};
