import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info';
import type { GetReleaseLine } from '@changesets/types';

export const getReleaseLine: GetReleaseLine = async (
  changeset,
  type,
  options,
) => {
  if (!options || !options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
    );
  }

  let prFromSummary: number | undefined;
  let commitFromSummary: string | undefined;
  const usersFromSummary: string[] = [];

  const replacedChangelog = changeset.summary
    .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
      const num = Number(pr);
      if (!Number.isNaN(num)) prFromSummary = num;
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
    if (prFromSummary !== undefined) {
      let { links } = await getInfoFromPullRequest({
        repo: options.repo,
        pull: prFromSummary,
      });
      if (commitFromSummary) {
        const shortCommitId = commitFromSummary.slice(0, 7);
        links = {
          ...links,
          commit: `[\`${shortCommitId}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
        };
      }
      return links;
    }
    const commitToFetchFrom = commitFromSummary || changeset.commit;
    if (commitToFetchFrom) {
      const { links } = await getInfo({
        repo: options.repo,
        commit: commitToFetchFrom,
      });
      return links;
    }
    return {
      commit: null,
      pull: null,
      user: null,
    };
  })();

  const users = usersFromSummary.length
    ? usersFromSummary
        .map(
          userFromSummary =>
            `[@${userFromSummary}](https://github.com/${userFromSummary})`,
        )
        .join(', ')
    : links.user;

  const suffix = [
    links.pull !== null || links.commit !== null
      ? `(${[links.pull, links.commit]
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

  return `\n\n- ${firstLineWithoutPunctuation}${suffix ? ` ${suffix}` : ''}${firstLinePunctuation ?? '.'}${restLinesContent}\n`;
};
