import { Input } from '~/input/input';
import { Lib } from '~/lib/lib';

export const initialGit = async ({
  input: { prompt },
  lib: { git, file },
}: {
  input: Input;
  lib: Lib;
}) => {
  if (prompt.git) {
    //! Initial commit
    const isRepo = await git.git.checkIsRepo();
    if (!isRepo) await git.git.init({ '--initial-branch': 'main' });

    await git.commit('chore: initial commit', [], { '--allow-empty': null });

    //! Git config
    await file.downloadAndWrite(
      'github:github/gitignore',
      'Node.gitignore',
      '.gitignore',
    );
    await file.downloadAndWrite(
      'github:gitattributes/gitattributes',
      'Web.gitattributes',
      '.gitattributes',
    );

    await git.commit('chore(git): git config');
  }
};
