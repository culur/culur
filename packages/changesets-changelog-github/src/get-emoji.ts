/* eslint-disable regexp/no-unused-capturing-group */
export const emojiDict = {
  init: /******/ '🎉',
  feat: /******/ '✨',
  fix: /*******/ '🩹',
  refactor: /**/ '🔨',
  perf: /******/ '🐎',
  test: /******/ '🚨',
  docs: /******/ '📝',
  style: /*****/ '🎨',
  package: /***/ '📦',
  build: /*****/ '🛠️',
  ci: /********/ '🚀',
  chore: /*****/ '⚙️',
  revert: /****/ '⏪',
  unknown: /***/ '❔',
} as const;

const messageRegex = /^(\w+)(\((.+)\))?: (.+)$/;

export const getEmoji = (message?: string) => {
  if (!message) return emojiDict.unknown;

  const result = messageRegex.exec(message);
  if (!result) return emojiDict.unknown;

  const {
    1: type, //
    3: scope,
    4: content,
  } = result;

  if (/^feat|build$/.test(type) && /^initial.*$/.test(content)) {
    return emojiDict.init;
  }

  if (
    /^feat|fix|build|chore$/.test(type) &&
    /^packages?|deps(-dev)?$/.test(scope)
  ) {
    return emojiDict.package;
  }

  if (/^update (dependency|dependencies).*$/.test(content)) {
    return emojiDict.package;
  }

  if (
    type in emojiDict &&
    typeof emojiDict[type as keyof typeof emojiDict] === 'string'
  ) {
    return emojiDict[type as keyof typeof emojiDict];
  }

  return emojiDict.unknown;
};
