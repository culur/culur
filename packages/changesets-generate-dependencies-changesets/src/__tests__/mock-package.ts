import { vi } from 'vitest';
import fs from 'fs-extra';
import type { PackageJson } from '@culur/types';
import * as module from '../changes/get-diff-package-files';

export function mockPackageFile(packageFile: string, json: PackageJson) {
  vi.spyOn(fs, 'readJson') //
    .mockImplementation(async command => (command === packageFile ? json : {}));
}

export function mockDiffPackageFiles(packageFile: string) {
  vi.spyOn(module, 'getDiffPackageFiles') //
    .mockImplementation(async () => [packageFile]);
}
