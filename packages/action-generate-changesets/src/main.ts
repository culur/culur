import exec from '@actions/exec';
import { configGit } from './input/config-git';
import { getBranches } from './input/get-branches';
import { getInput } from './input/get-input';
import { getDiffPackages } from './changes/get-diff-packages';
import { getCommit } from './input/get-commit';
import { createChangeset } from './changes/create-changeset';

export async function main() {
  const input = getInput();
  const branches = await getBranches({ input });
  const commit = await getCommit();

  await configGit({ input });

  const diffPackageFiles = await getDiffPackages({ branches });
  await createChangeset({ diffPackageFiles, commit });

  await exec.exec('git add .changeset/*.md');
  await exec.exec('git commit -C HEAD --amend --no-edit');
  await exec.exec('git push --force');
}
