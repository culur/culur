declare module 'postcss-html' {
  import type { Syntax } from 'postcss';
  const syntax: Syntax;

  export default () => syntax;
}

declare module 'postcss-scss' {
  import type { Syntax } from 'postcss';
  const syntax: Syntax;

  export default syntax;
}

declare module 'postcss-sass' {
  import type { Syntax } from 'postcss';
  const syntax: Syntax;

  export default syntax;
}
