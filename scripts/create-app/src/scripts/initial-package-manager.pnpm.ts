import type { PromptInput } from '~/input/prompt';
import type { Lib } from '~/lib/lib';

export const initialPackageManagerPnpm = async ({
  pm,
  lib: { git, packageJson, exec },
}: {
  pm: (PromptInput & { pm: { packageManager: 'pnpm' } })['pm'];
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

  await exec.run`pnpm install`;
  await git.commit('build(package): pin node, pnpm');
};
