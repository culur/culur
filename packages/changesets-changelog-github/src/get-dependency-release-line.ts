import { getInfo } from '@changesets/get-github-info';
import type { GetDependencyReleaseLine } from '@changesets/types';

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

  const changesetLink = `- Updated dependencies (${(
    await Promise.all(
      changesets.map(async cs => {
        if (cs.commit) {
          const { links } = await getInfo({
            repo: options.repo,
            commit: cs.commit,
          });
          return links.commit;
        }
      }),
    )
  )
    .filter(_ => _)
    .join(', ')}):`;

  const updatedDependenciesList = dependenciesUpdated.map(
    dependency => `  - \`${dependency.name}@${dependency.newVersion}\``,
  );

  return [changesetLink, ...updatedDependenciesList].join('\n');
};
