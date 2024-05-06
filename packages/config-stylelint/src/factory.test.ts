import { css, testLintAndFix } from './__tests__';
import defineConfig from './factory';

testLintAndFix(defineConfig, [
  {
    code: css`
      a {
        color: red;
      }
    `,
    hasSass: true,
    hasVue: true,
    isError: false,
  },
]);
