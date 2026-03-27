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

const messageRegex = /^(\w+)(?:\((.+)\))?: (.+)$/;

const typeInitialRegex = /^feat|build$/;
const contentInitialRegex = /^initial.*$/;

const typePackageRegex = /^feat|fix|build|chore$/;
const contentPackageRegex = /^packages?|.*deps(?:-dev)?$/;

const contentDependencyRegex = /^update (?:dependency|dependencies).*$/;

export const getEmoji = (message?: string) => {
  if (!message) return emojiDict.unknown;

  const result = messageRegex.exec(message);
  if (!result) return emojiDict.unknown;

  const {
    1: type, //
    2: scope,
    3: content,
  } = result;

  if (typeInitialRegex.test(type) && contentInitialRegex.test(content)) {
    return emojiDict.init;
  }

  if (typePackageRegex.test(type) && contentPackageRegex.test(scope)) {
    return emojiDict.package;
  }

  if (contentDependencyRegex.test(content)) {
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
