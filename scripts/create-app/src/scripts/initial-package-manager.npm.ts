import type { PromptInput } from '~/input/prompt';
import type { Lib } from '~/lib/lib';

export const initialPackageManagerNpm = async ({
  pm,
  lib: { git, packageJson, exec },
}: {
  pm: (PromptInput & { pm: { packageManager: 'npm' } })['pm'];
  lib: Lib;
}) => {
  await exec.run`volta pin ${pm.packageManagerVersion}`;
  await exec.run`npm install`;

  await packageJson.read();
  await packageJson
    .append({ engines: { node: '>=20', yarn: pm.versionFull } })
    .append({ packageManager: pm.packageManagerVersion })
    .write();

  await git.commit('build(package): pin node, npm');
};
