import { describe, expect, it } from 'vitest';
import { groupClasses } from './group-classes';

describe('groupClasses with category-first and modifier threshold', () => {
  it('should group classes without modifiers according to categories', () => {
    const input = ['flex', 'items-center', 'p-4', 'text-sm', 'bg-white'];
    const result = groupClasses(input);

    expect(result).toEqual([
      'flex items-center',
      'p-4',
      'text-sm',
      'bg-white',
    ]);
  });

  it('should merge modifier classes into the base class line when modifier count <= 2 (threshold)', () => {
    const input = [
      'text-sm',
      'font-medium',
      'hover:text-blue-600',
      'dark:text-white',
    ];
    const result = groupClasses(input);

    expect(result).toEqual([
      'text-sm font-medium hover:text-blue-600 dark:text-white',
    ]);
  });

  it('should split modifier classes into separate lines when total modifier count >= 3', () => {
    const input = [
      'bg-white',
      'hover:bg-gray-100',
      'dark:bg-gray-900',
      'dark:hover:bg-gray-800',
      'md:bg-transparent',
    ];
    const result = groupClasses(input);

    expect(result).toEqual([
      'bg-white',
      'hover:bg-gray-100',
      'md:bg-transparent',
      'dark:bg-gray-900',
      'dark:hover:bg-gray-800',
    ]);
  });

  it('should respect custom modifierThreshold option', () => {
    const input = [
      'bg-white',
      'hover:bg-gray-100',
      'dark:bg-gray-900',
      'dark:hover:bg-gray-800',
    ];

    // With modifierThreshold = 4, 3 modifiers should remain merged
    const mergedResult = groupClasses(input, 4);
    expect(mergedResult).toEqual([
      'bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800',
    ]);

    // With modifierThreshold = 1, 3 modifiers should split
    const splitResult = groupClasses(input, 1);
    expect(splitResult).toEqual([
      'bg-white',
      'hover:bg-gray-100',
      'dark:bg-gray-900',
      'dark:hover:bg-gray-800',
    ]);

    // With modifierThreshold = 0, even a single modifier splits from base classes
    const zeroResult = groupClasses(['flex', 'hover:flex'], 0);
    expect(zeroResult).toEqual(['flex', 'hover:flex']);
  });

  it('should handle postfix opacity modifier such as /50 and group by base class category', () => {
    const input = ['bg-red-500/50', 'bg-white', 'text-white/80', 'text-sm'];
    const result = groupClasses(input);

    expect(result).toEqual([
      'text-white/80 text-sm',
      'bg-red-500/50 bg-white',
    ]);
  });

  it('should handle category without base classes when total modifiers >= 3', () => {
    const input = [
      'focus:ring-2',
      'focus:ring-blue-500',
      'dark:focus:ring-blue-400',
    ];
    const result = groupClasses(input);

    expect(result).toEqual([
      'focus:ring-2 focus:ring-blue-500',
      'dark:focus:ring-blue-400',
    ]);
  });

  it('should handle named group, peer and container classes in category 1', () => {
    const input = [
      'group/button',
      'peer/draft',
      '@container/sidebar',
      'text-sm',
    ];
    const result = groupClasses(input);

    expect(result).toEqual([
      'group/button peer/draft @container/sidebar',
      'text-sm',
    ]);
  });

  it('should handle unknown custom classes and put them at the end', () => {
    const input = ['flex', 'custom-component-class', 'another-unknown'];
    const result = groupClasses(input);

    expect(result).toEqual([
      'flex',
      'custom-component-class another-unknown',
    ]);
  });
});
