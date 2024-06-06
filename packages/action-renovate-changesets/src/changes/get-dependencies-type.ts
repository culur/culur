import type { PackageJson } from '@culur/types';

export const dependenciesTypes = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies',
  'engines',
  'volta',
] as const;

export type DependenciesType = (typeof dependenciesTypes)[number];

export function getDependenciesType(
  packageJson: PackageJson,
  packageName: string,
  packageVersion: string,
) {
  for (const dependenciesType of dependenciesTypes) {
    if (packageJson[dependenciesType]?.[packageName] === packageVersion) {
      return dependenciesType;
    }
  }
  throw new Error('Unknown dependencies change');
}
