import { defineObject } from '@culur/types';

export type GithubInfo = {
  repo: string;
  user: string;
} & ({ commit: string } | { commit: null }) &
  ({ pull: number } | { pull: null });

export const defineGithubInfo = defineObject<GithubInfo>();
