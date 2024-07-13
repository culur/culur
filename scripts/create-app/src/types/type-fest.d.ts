import type { PartialDeep } from 'type-fest';

declare module 'type-fest' {
  declare namespace PackageJson {
    export interface PackageJsonStandard {
      volta?: PartialDeep<{
        node: string;
        npm: string;
        pnpm: string;
        yarn: string;
      }>;
    }
  }
}
