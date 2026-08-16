import { describe, expect, it } from 'vitest';
import { sortModifierKeys } from './modifier-order.prettier-plugin-tailwindcss';

describe('sortModifierKeys with Tailwind CSS Compiler sorter', () => {
  it('returns array as is when length <= 1', () => {
    expect(sortModifierKeys([])).toEqual([]);
    expect(sortModifierKeys(['hover'])).toEqual(['hover']);
  });

  it('correctly sorts standard Tailwind CSS modifiers', () => {
    const input = ['dark:hover', 'hover', 'md', 'dark', 'sm'];
    const sorted = sortModifierKeys(input);

    expect(sorted).toEqual(['hover', 'sm', 'md', 'dark', 'dark:hover']);
  });

  it('handles arbitrary variants and bracket syntax without corruption', () => {
    const input = [
      'hover',
      '[@supports(display:grid)]:hover',
      'dark',
      '[&_svg]:hover',
    ];
    const sorted = sortModifierKeys(input);

    expect(sorted).toEqual([
      'hover',
      'dark',
      '[&_svg]:hover',
      '[@supports(display:grid)]:hover',
    ]);
  });
});
