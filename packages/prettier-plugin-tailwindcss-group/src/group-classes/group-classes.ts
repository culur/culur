import { classGroupsCount } from '../orders/class-groups';
import { configUtils } from '../orders/class-order.tailwind-merge';
import {
  addClassToBucket,
  createClassBuckets,
  resolveGroupIndex,
} from './group-classes.bucket';
import { formatBucketLines } from './group-classes.format';

export function groupClasses(
  classes: string[],
  modifierThreshold = 2,
): string[] {
  const unknownGroupIndex = classGroupsCount - 1;
  const buckets = createClassBuckets();

  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    const parsed = configUtils.parseClassName(cls);
    const groupIndex = resolveGroupIndex(parsed, unknownGroupIndex);
    addClassToBucket(buckets[groupIndex], cls, parsed.modifiers);
  }

  const result: string[] = [];

  for (let i = 0; i < classGroupsCount; i++) {
    const lines = formatBucketLines(buckets[i], modifierThreshold);
    for (let j = 0; j < lines.length; j++) {
      result.push(lines[j]);
    }
  }

  return result;
}
