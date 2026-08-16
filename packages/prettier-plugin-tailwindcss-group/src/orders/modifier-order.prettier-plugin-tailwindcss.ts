import { createSorter } from 'prettier-plugin-tailwindcss/sorter';

// Initialize Tailwind Compiler sorter once at module evaluation
const sorter = await createSorter({});
const DUMMY_SUFFIX = ':flex';

/**
 * Sorts modifier keys according to Tailwind CSS Compiler AST order
 * using dummy classes (e.g. 'hover' -> 'hover:flex').
 *
 * @param modifierKeys Array of modifier strings (e.g. ['dark:hover', 'hover', 'md', 'dark', 'sm'])
 * @returns Sorted array of modifier keys adhering to official Tailwind Compiler order
 */
export function sortModifierKeys(modifierKeys: string[]): string[] {
  if (modifierKeys.length <= 1) {
    return modifierKeys;
  }

  const dummyClasses = modifierKeys.map(mod => `${mod}${DUMMY_SUFFIX}`);
  const [sortedDummyClasses] = sorter.sortClassLists([dummyClasses]);

  return sortedDummyClasses.map(cls => cls.slice(0, -DUMMY_SUFFIX.length));
}
