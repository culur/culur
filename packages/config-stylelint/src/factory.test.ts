import * as utilsPackages from '@culur/utils-packages';
import { css, describeLintAndFix } from './__tests__';
import defineConfig from './factory';

describeLintAndFix(utilsPackages, defineConfig, [
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
