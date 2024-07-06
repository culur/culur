import dedent from 'dedent';
import parse from '@changesets/parse';
import type { GetReleaseLine } from '@changesets/types';
import type { GithubInfo } from './github-info';

export const getReleaseLineProps = (
  data: GithubInfo,
  content: string,
): Parameters<GetReleaseLine> => {
  const head = dedent`
    ---
    pkg: "minor"
    ---
  `;
  const changeset = [head, content].join('\n');

  return [
    { ...parse(changeset), id: 'some-id', commit: data.commit ?? undefined }, //
    'minor',
    { repo: data.repo },
  ];
};
