import exec from '@actions/exec';
import { getDiffPackages } from './changes/get-diff-packages';
import { createChangeset } from './changes/create-changeset';
import { getBranches } from './setup/get-branches';
import { setupGit } from './git/setup-git';

export async function main() {
  const branches = await getBranches();
  await setupGit(branches);

  const diffPackageFiles = await getDiffPackages(branches);
  await createChangeset(diffPackageFiles);

  await exec.exec('git add .changeset/*.md');
  await exec.exec('git commit -C HEAD --amend --no-edit');
  await exec.exec('git push --force');
}
