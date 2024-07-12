import { getCommitInfo } from '@culur/changesets-github-info';
import type { GetDependencyReleaseLine } from '@changesets/types';
import type { SetRequired } from 'type-fest';

export const getDependencyReleaseLine: GetDependencyReleaseLine = async (
  changesets,
  dependenciesUpdated,
  options,
) => {
  if (!options || !options.repo) {
    throw new Error(
      'Please provide a repo to this changelog generator like this:\n"changelog": ["@culur/changesets-changelog-github", { "repo": "org/repo" }]',
    );
  }
  if (dependenciesUpdated.length === 0) return '';

  const commits = changesets
    .filter((cs): cs is SetRequired<typeof cs, 'commit'> => !!cs.commit)
    .map(async cs => {
      const commitInfo = await getCommitInfo({
        repo: options.repo,
        commitHash: cs.commit,
      });
      return commitInfo.commit.link;
    });

  const commitLinks = (await Promise.all(commits)).join(' ');

  const changesetLink = `- 📦 Update workspace dependencies (${commitLinks}):`;

  const updatedDependenciesList = dependenciesUpdated.map(
    dependency => `  - \`${dependency.name}@${dependency.newVersion}\``,
  );

  return [changesetLink, ...updatedDependenciesList].join('\n');
};
