import type { PackageJsonExtends } from '@culur/types';
import fs from 'fs-extra';
import { vi } from 'vitest';
import * as module from '../changes/get-diff-package-files';

export function mockPackageFile(packageFile: string, json: PackageJsonExtends) {
  vi.spyOn(fs, 'readJson') //
    .mockImplementation(async command => (command === packageFile ? json : {}));
}

export function mockDiffPackageFiles(packageFile: string) {
  vi.spyOn(module, 'getDiffPackageFiles') //
    .mockImplementation(async () => [packageFile]);
}
