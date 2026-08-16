import type { ClassGroupBucket } from './group-classes.types';
import { sortModifierKeys } from '../orders/modifier-order.prettier-plugin-tailwindcss';

export function formatBucketLines(
  bucket: ClassGroupBucket,
  modifierThreshold: number,
): string[] {
  const { baseClasses, modifierGroups, totalModifierCount } = bucket;

  if (baseClasses.length === 0 && totalModifierCount === 0) {
    return [];
  }

  const sortedModifierKeys = sortModifierKeys(
    Array.from(modifierGroups.keys()),
  );

  if (totalModifierCount <= modifierThreshold) {
    // Threshold not met (<= modifierThreshold): Merge all classes into 1 line
    const lineClasses = [...baseClasses];
    for (let i = 0; i < sortedModifierKeys.length; i++) {
      lineClasses.push(...modifierGroups.get(sortedModifierKeys[i])!);
    }
    return [lineClasses.join(' ')];
  }

  // Threshold exceeded (> modifierThreshold): Separate base classes and each modifier cluster into distinct lines
  const lines: string[] = [];
  if (baseClasses.length > 0) {
    lines.push(baseClasses.join(' '));
  }

  for (let i = 0; i < sortedModifierKeys.length; i++) {
    const modClasses = modifierGroups.get(sortedModifierKeys[i])!;
    lines.push(modClasses.join(' '));
  }

  return lines;
}
