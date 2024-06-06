import { vi } from 'vitest';
import exec from '@actions/exec';

export function mockExecOutput(options: {
  diffFiles?: {
    baseBranch: string;
    diffFiles: string;
  };
  changedLines?: {
    baseBranch: string;
    packageFile: string;
    changedLines: string;
  };
  shortCommitHash?: {
    commitHash: string;
  };
}) {
  vi.spyOn(exec, 'getExecOutput').mockImplementation(async command => {
    if (
      options.diffFiles &&
      command ===
        `git diff --name-only origin/${options.diffFiles.baseBranch} --`
    ) {
      const { diffFiles } = options.diffFiles;
      return { exitCode: 0, stdout: diffFiles, stderr: '' };
    }

    if (
      options.changedLines &&
      command ===
        `git diff origin/${options.changedLines.baseBranch} -- ${options.changedLines.packageFile}`
    ) {
      const { changedLines } = options.changedLines;
      return { exitCode: 0, stdout: changedLines, stderr: '' };
    }

    if (options.shortCommitHash && command === 'git rev-parse --short HEAD') {
      const { commitHash } = options.shortCommitHash;
      return { exitCode: 0, stdout: commitHash, stderr: '' };
    }

    throw new Error('Not implemented');
  });

  vi.spyOn(exec, 'exec').mockImplementation(async () => 0);
}
