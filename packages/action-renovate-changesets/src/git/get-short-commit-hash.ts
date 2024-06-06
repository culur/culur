import exec from '@actions/exec';

export async function getShortCommitHash() {
  const { stdout: shortHash } = await exec.getExecOutput(
    'git rev-parse --short HEAD',
  );

  return shortHash.trim();
}
