import type { GetDependencyReleaseLine } from '@changesets/types';
import { emojiDict } from './get-emoji';

export const getDependencyReleaseLine: GetDependencyReleaseLine = async (
  _changesets,
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
    ({ packageJson, name, newVersion }) => {
      const homepage =
        'homepage' in packageJson && typeof packageJson.homepage === 'string'
          ? packageJson.homepage
          : null;
      const packageNameAndVersion = `\`${name}@${newVersion}\``;

      return homepage
        ? `  - [${packageNameAndVersion}](${homepage})`
        : `  - ${packageNameAndVersion}`;
    },
  );

  return [changesetLink, ...updatedDependenciesList].join('\n');
};
