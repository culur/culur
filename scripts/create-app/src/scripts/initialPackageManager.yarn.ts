import dedent from 'dedent';
import { PromptInput } from '~/input/prompt';
import { Lib } from '~/lib/lib';

export const initialPackageManagerYarn = async ({
  pm,
  lib: { git, packageJson, exec, file },
}: {
  pm: (PromptInput & { pm: { packageManager: 'yarn' } })['pm'];
  lib: Lib;
}) => {
  await exec.run`volta pin ${pm.packageManagerVersion}`;

  await packageJson.read();
  await packageJson
    .append({
      engines: { node: '>=20', yarn: pm.versionFull },
      packageManager: pm.packageManagerVersion,
    })
    .write();

  await exec.run`yarn`;
  await exec.run`yarn set version ${pm.versionFull}`;
  await exec.run`yarn config set nodeLinker pnpm`;

  if (pm.versionShort === '4') {
    await exec.run`yarn config set compressionLevel mixed`;
    await exec.run`yarn config set enableMirror false`;
    await exec.run`yarn config set enableGlobalCache false`;
    await exec.run`yarn config set globalFolder .yarn/berry`;

    const gitIgnoreContent = await file.read('.gitignore');
    await file.write(
      '.gitignore',
      dedent`
        ${gitIgnoreContent.trim()}

        # yarn: globalFolder
        .yarn/berry

      `,
    );
  }

  await git.commit('build(package): pin node, yarn');
};
