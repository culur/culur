import { describe, expect, it } from 'vitest';
import { getEmoji } from './get-emoji';

describe('getEmoji', () => {
  it.each([
    ['❔', undefined],
    ['❔', ''],
    ['❔', 'invalid conventional commit'],
    ['❔', 'update: invalid type'],
    ['✨', 'feat: add new feature'],
    ['✨', 'feat(pkg-a): add new feature'],
    ['✨', 'feat(@culur/foo): add new feature'],
    ['🩹', 'fix: remove abc'],
    ['🚨', 'test: module `foo`'],
    ['🐎', 'perf: improve bar()'],
    ['🎉', 'build: initial'],
    ['🎉', 'feat(pkg-a): initial project'],
    ['📦', 'feat(changesets-changelog-github): update dependency `@culur/foo`'],
    ['📦', 'feat(deps): update dependency'],
    ['📦', 'feat(deps-dev): update dependency'],
    ['📦', 'chore(package): add scripts'],
    ['📦', 'feat(pkg-a): update dependency `lodash` version'],
    ['📝', 'docs: update `README.md`'],
  ] as const)("%s '%s'", (expectedEmoji, message) => {
    const emoji = getEmoji(message);
    expect(emoji).toEqual(expectedEmoji);
  });
});
