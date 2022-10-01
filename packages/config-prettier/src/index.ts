import type { Config } from "prettier";
import os from "os";

// https://prettier.io/docs/en/options.html

const isWin = os.platform() === "win32";
const options: Config = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "ignore",
  vueIndentScriptAndStyle: false,
  endOfLine: isWin ? "crlf" : "lf",
  embeddedLanguageFormatting: "off",
  overrides: [
    {
      files: [
        // alphabetical order
        ".babelrc",
        ".czrc",
        ".eslintrc",
        ".gqlconfig",
        ".prettierrc",
        ".releaserc",
        ".stylelintrc",
        "*.code-workspace",
      ],
      options: { parser: "json" },
    },
    {
      files: [
        // alphabetical order
        "package.json",
        "package-lock.json",
        "*.md",
        "*.yml",
      ],
      options: { tabWidth: 2 },
    },
    {
      files: [
        // alphabetical order
        "yarn.lock",
        ".yarnrc.yml",
      ],
      options: { singleQuote: false },
    },
  ],
};

export = options;
