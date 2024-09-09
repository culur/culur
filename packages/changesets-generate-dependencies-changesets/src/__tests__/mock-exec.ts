import exec from '@actions/exec';
import { vi } from 'vitest';

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
  commit?: {
    hash: string;
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

    if (options.commit && command === 'git rev-parse --short HEAD') {
      const { hash } = options.commit;
      return { exitCode: 0, stdout: hash, stderr: '' };
    }

    throw new Error('Not implemented');
  });

  vi.spyOn(exec, 'exec').mockImplementation(async () => 0);
}

export function mockChangedLines(
  baseBranch: string,
  packageFile: string,
  changedLines: string,
) {
  mockExecOutput({ changedLines: { baseBranch, changedLines, packageFile } });
}

export function mockDiffFiles(baseBranch: string, diffFiles: string) {
  return mockExecOutput({ diffFiles: { baseBranch, diffFiles } });
}

export function mockCommitHash(hash: string) {
  return mockExecOutput({ commit: { hash } });
}
