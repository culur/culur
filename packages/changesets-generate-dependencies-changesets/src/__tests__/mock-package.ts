import type { PackageJsonExtends } from '@culur/types';
import fs from 'fs-extra';
import { vi } from 'vitest';
import { getDiffPackageFiles } from '../changes/get-diff-package-files';

vi.mock('../changes/get-diff-package-files', () => ({
  getDiffPackageFiles: vi.fn(),
}));

export function mockPackageFile(packageFile: string, json: PackageJsonExtends) {
  vi.spyOn(fs, 'readJson') //
    .mockImplementation(async command => (command === packageFile ? json : {}));
}

export function mockDiffPackageFiles(packageFile: string) {
  vi.mocked(getDiffPackageFiles).mockImplementation(async () => [packageFile]);
}
