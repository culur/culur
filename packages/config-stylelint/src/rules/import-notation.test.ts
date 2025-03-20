import { describeLintAndFix } from '~/__tests__';
import { importNotationCSS } from './import-notation';

describeLintAndFix(
  o => ({
    extends: ['stylelint-config-standard'],
    rules: importNotationCSS(o),
  }),
  [
    { tailwind: 0, code: '@import "tailwindcss";', isError: true },
    { tailwind: 1, code: '@import "tailwindcss";', isError: true },
    { tailwind: 2, code: '@import "tailwindcss";', isError: true },
    { tailwind: 3, code: '@import "tailwindcss";', isError: true },
    { tailwind: 4, code: '@import "tailwindcss";', isError: false },
  ],
);
