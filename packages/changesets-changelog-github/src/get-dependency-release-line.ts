import type { GetDependencyReleaseLine } from '@changesets/types';
import { emojiDict } from './get-emoji';

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

  const changesetLink = `- ${emojiDict.package} Update workspace dependencies:`;

  const updatedDependenciesList = dependenciesUpdated.map(
    dependency => `  - \`${dependency.name}@${dependency.newVersion}\``,
  );

  return [changesetLink, ...updatedDependenciesList].join('\n');
};
