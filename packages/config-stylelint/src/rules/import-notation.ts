import type { Packages } from '@culur/utils-packages';
import { defineRules, isInRange } from '~/utils';

export const importNotationCSS = (packages: Partial<Packages>) =>
  defineRules(
    isInRange(packages.tailwind, 4) //
      ? { 'import-notation': null }
      : {},
  );
