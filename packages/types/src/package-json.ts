import type { PackageJson } from 'type-fest';

interface VoltaConfiguration {
  volta?: {
    [EngineName in 'node' | 'npm' | 'pnpm' | 'yarn' | string]?: string;
  };
}

export type PackageJsonExtends = PackageJson & VoltaConfiguration;
