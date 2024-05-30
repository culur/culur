import exec from '@actions/exec';
import { getChangedPackages } from './changes/get-changed-packages';
import { checkBranch } from './branch/check-branch';
import { createChangeset } from './changes/create-changeset';
import { getInput } from './input/get-input';

(async () => {
  await checkBranch();
  const input = getInput();

  const changedFiles = await getChangedPackages(input);
  await createChangeset(changedFiles);

  await exec.exec('it add .changeset/*.md');
  await exec.exec('git commit -C HEAD --amend --no-edit');
  await exec.exec('git push --force');
})();
