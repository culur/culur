import { describe, expect, test } from 'vitest';
import {
  defaultPackages,
  hasSass,
  hasTailwind,
  hasVue,
  updateDefaultPackages,
  defineHasPackages,
} from './';
import { Packages } from './defineHasPackages';

describe('defineHasPackages', () => {
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

  test.each(testCases)(name, options => {
    const { hasSass, hasTailwind, hasVue } = defineHasPackages(options);

    expect(hasTailwind()).toBe(options?.tailwind ?? false);
    expect(hasSass()).toBe(options?.sass ?? false);
    expect(hasVue()).toBe(options?.vue ?? false);
  });
});

describe('updateDefaultPackages', () => {
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

  test.each(testCases)(name, options => {
    updateDefaultPackages(options);

    expect(defaultPackages.tailwind).toBe(options?.tailwind);
    expect(defaultPackages.sass).toBe(options?.sass);
    expect(defaultPackages.vue).toBe(options?.vue);

    expect(hasTailwind()).toBe(options?.tailwind ?? false);
    expect(hasSass()).toBe(options?.sass ?? false);
    expect(hasVue()).toBe(options?.vue ?? false);
  });
});
