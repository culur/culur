import { css, describeLintAndFix } from './__tests__';
import defineConfig from './factory';

describeLintAndFix(
  () => defineConfig({ vue: true, sass: true }),
  [
    {
      code: css`
        a {
          color: red;
        }
      `,
      isError: false,
    },
  ],
);

describeLintAndFix(
  () => defineConfig(),
  [
    {
      code: css`
        a {
          color: red;
        }
      `,
      isError: false,
    },
  ],
);
