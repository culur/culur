import exec from '@actions/exec';
import { createChangeset } from './changes/create-changeset';
import { getDiffPackages } from './changes/get-diff-packages';
import { configGit } from './input/config-git';
import { getBranches } from './input/get-branches';
import { getCommit } from './input/get-commit';
import { getInput } from './input/get-input';

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
