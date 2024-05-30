import type { PackageJson as PackageJsonTypeFest } from 'type-fest';

interface VoltaConfiguration {
  volta?: {
    [EngineName in 'node' | 'npm' | 'pnpm' | 'yarn' | string]?: string;
  };
}

export type PackageJson = PackageJsonTypeFest & VoltaConfiguration;
