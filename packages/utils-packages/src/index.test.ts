import type { Packages } from './define-has-packages';
import { describe, expect, it } from 'vitest';
import {
  defineHasPackages,
  hasSass,
  hasTailwind,
  hasVue,
  updateDefaultPackages,
} from '.';

describe.each([
  { name: 'updateDefaultPackages' },
  { name: 'defineHasPackages' },
] as const)('$name', ({ name: describeName }) => {
  const testCases: (Partial<Packages> | undefined)[] = [
    { tailwind: true },
    { tailwind: false },
    { sass: true },
    { sass: false },
    { vue: true },
    { vue: false },
    {},
  ];

  const name = (['tailwind', 'sass', 'vue'] as const)
    .filter(field => testCases.some(t => typeof t?.[field] === 'boolean'))
    .map(field => `${field} = $${field}`)
    .join(', ');

  it.each(testCases)(name, options => {
    const hasPackages = (() => {
      switch (describeName) {
        case 'defineHasPackages':
          return defineHasPackages(options);
        case 'updateDefaultPackages':
          updateDefaultPackages(options);
          return { hasSass, hasTailwind, hasVue };
      }
    })();

    expect(hasPackages.hasTailwind()).toBe(options?.tailwind ?? false);
    expect(hasPackages.hasSass()).toBe(options?.sass ?? false);
    expect(hasPackages.hasVue()).toBe(options?.vue ?? false);
  });
});
