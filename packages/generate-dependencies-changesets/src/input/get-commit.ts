import exec from '@actions/exec';

export async function getCommit() {
  const { stdout: commitHash } = await exec.getExecOutput(
    'git rev-parse --short HEAD',
  );

  return {
    hash: commitHash.trim(),
  };
}

export type Commit = Awaited<ReturnType<typeof getCommit>>;
