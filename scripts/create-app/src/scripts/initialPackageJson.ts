import { Input } from '~/input/input';
import { Lib } from '~/lib/lib';

export const initialPackageJson = async ({
  input: { prompt, dir },
  lib: { git, packageJson },
}: {
  input: Input;
  lib: Lib;
}) => {
  await packageJson
    .append({
      name: dir.projectName,
      version: '0.0.0',
      description: dir.projectName,
      type: 'module',
    })
    .write();

  if (prompt.git) {
    await git.commit('build(package): npm init');
  }
};
