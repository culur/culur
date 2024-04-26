import { Config } from 'stylelint';
import postcssHtml from 'postcss-html';
import postcssSass from 'postcss-sass';
import postcssScss from 'postcss-scss';

type OverrideSyntax = Config['overrides'] extends (infer T)[] | undefined
  ? T
  : never;

export const syntaxScss: OverrideSyntax = {
  files: ['*.scss', '**/*.scss'],
  customSyntax: postcssScss,
};

export const syntaxSass: OverrideSyntax = {
  files: ['*.sass', '**/*.sass'],
  customSyntax: postcssSass,
};

export const syntaxHtml: OverrideSyntax = {
  files: ['*.vue', '**/*.vue'],
  customSyntax: postcssHtml(),
};
