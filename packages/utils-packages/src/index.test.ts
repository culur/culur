import type { Mock } from 'vitest';
import type { DefaultPackages } from './define-has-packages';
import { getPackageInfoSync, isPackageExists } from 'local-pkg';
import { describe, expect, it, vi } from 'vitest';
import {
  defineHasPackages,
  hasSass,
  hasTailwind,
  hasVue,
  tailwindVersion,
  updateDefaultPackages,
} from '.';

vi.mock('local-pkg', () => ({
  isPackageExists: vi.fn(),
  getPackageInfoSync: vi.fn(),
}));

const testCases: {
  name: string;
  options?: Partial<DefaultPackages> | undefined;
  mockVersions?: Record<string, string>;
  expected?: Partial<{
    tailwind: boolean;
    vue: boolean;
    sass: boolean;
    tailwindVersion: null | number;
  }>;
}[] = [
  { name: 'empty' },

  //! Vue
  { name: 'options vue = false', /*******/ options: { vue: false } },
  { name: 'options vue = true', /********/ options: { vue: true } },

  //! Sass
  { name: 'options sass = false', /******/ options: { sass: false } },
  { name: 'options sass = true', /*******/ options: { sass: true } },

  //! Tailwind
  {
    name: 'options tailwind = false',
    options: { tailwind: false },
  },
  {
    name: 'options tailwind = 3',
    options: { tailwind: 3 },
    expected: { tailwind: true, tailwindVersion: 3 },
  },
  {
    name: 'options tailwind = 4',
    options: { tailwind: 4 },
    expected: { tailwind: true, tailwindVersion: 4 },
  },
  {
    name: 'version tailwind = 3.4.17',
    mockVersions: { tailwindcss: '3.4.17' },
    expected: { tailwind: true, tailwindVersion: 3 },
  },
  {
    name: 'version tailwind = 4.0.14',
    mockVersions: { tailwindcss: '4.0.14' },
    expected: { tailwind: true, tailwindVersion: 4 },
  },
];

describe.each([
  { name: 'updateDefaultPackages' },
  { name: 'defineHasPackages' },
] as const)('$name', ({ name: describeName }) => {
  it.each(testCases)('$name', testCase => {
    (isPackageExists as Mock).mockImplementation(
      (name: string) => !!testCase.mockVersions?.[name],
    );
    (getPackageInfoSync as Mock).mockImplementation((name: string) => ({
      version: testCase.mockVersions?.[name],
    }));

    const hasPackages = (() => {
      switch (describeName) {
        case 'defineHasPackages':
          return defineHasPackages(testCase.options);
        case 'updateDefaultPackages':
          updateDefaultPackages(testCase.options);
          return { hasVue, hasSass, hasTailwind, tailwindVersion };
      }
    })();

    expect(hasPackages.hasVue()).toBe(
      testCase.expected?.vue ?? testCase.options?.vue ?? false,
    );
    expect(hasPackages.hasSass()).toBe(
      testCase.expected?.sass ?? testCase.options?.sass ?? false,
    );
    expect(hasPackages.hasTailwind()).toBe(
      testCase.expected?.tailwind ?? testCase.options?.tailwind ?? false,
    );
    expect(hasPackages.tailwindVersion()).toBe(
      testCase.expected?.tailwindVersion ?? false,
    );
  });
});
