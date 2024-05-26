import type { Config } from 'stylelint';
import postcssScss from 'postcss-scss';

type OverrideSyntax = Config['overrides'] extends (infer T)[] | undefined
  ? T
  : never;

export const syntaxScss: OverrideSyntax = {
  files: ['*.scss', '**/*.scss'],
  customSyntax: postcssScss,
};
