import { getExecOutput } from '@actions/exec';

export async function getCommit() {
  const { stdout: commitHash } = await getExecOutput(
    'git rev-parse --short HEAD',
  );

  return {
    hash: commitHash.trim(),
  };
}

export type Commit = Awaited<ReturnType<typeof getCommit>>;
