import postcssScss from 'postcss-scss';
import type { Config } from 'stylelint';

type OverrideSyntax = Config['overrides'] extends (infer T)[] | undefined
  ? T
  : never;

export const syntaxScss: OverrideSyntax = {
  files: ['*.scss', '**/*.scss'],
  customSyntax: postcssScss as unknown as OverrideSyntax['customSyntax'],
};
