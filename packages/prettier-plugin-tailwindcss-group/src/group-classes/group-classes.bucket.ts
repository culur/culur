import type { ClassGroupBucket } from './group-classes.types';
import { classGroups, classGroupsCount } from '../orders/class-groups';
import { configUtils } from '../orders/class-order.tailwind-merge';

/**
 * Fast lookup map from tailwind-merge groupId to class group index (0-based).
 * Built with null prototype to avoid prototype pollution and enable O(1) lookups.
 */
const groupIdToGroupIndex: Record<string, number> = Object.create(null);

for (let groupIndex = 0; groupIndex < classGroups.length; groupIndex++) {
  const groupList = classGroups[groupIndex];
  for (let i = 0; i < groupList.length; i++) {
    groupIdToGroupIndex[groupList[i]] = groupIndex;
  }
}

export function createClassBuckets(): ClassGroupBucket[] {
  return Array.from({ length: classGroupsCount }, () => ({
    baseClasses: [],
    modifierGroups: new Map(),
    totalModifierCount: 0,
  }));
}

export function resolveGroupIndex(
  parsed: ReturnType<typeof configUtils.parseClassName>,
  unknownGroupIndex: number,
): number {
  // Strip postfix modifier (e.g. '/item' or '/50') to properly resolve base class groupId
  const baseClassName = parsed.maybePostfixModifierPosition
    ? parsed.baseClassName.slice(0, parsed.maybePostfixModifierPosition)
    : parsed.baseClassName;

  const groupId = configUtils.getClassGroupId(baseClassName);

  return groupId !== undefined && groupIdToGroupIndex[groupId] !== undefined
    ? groupIdToGroupIndex[groupId]
    : unknownGroupIndex;
}

export function addClassToBucket(
  bucket: ClassGroupBucket,
  cls: string,
  modifiers: string[],
): void {
  if (modifiers.length === 0) {
    bucket.baseClasses.push(cls);
    return;
  }

  const modifierKey = modifiers.join(':');
  const group = bucket.modifierGroups.get(modifierKey);

  if (group) {
    group.push(cls);
  } else {
    bucket.modifierGroups.set(modifierKey, [cls]);
  }
  bucket.totalModifierCount++;
}
