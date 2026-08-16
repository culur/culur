import { describe, expect, it } from 'vitest';
import { classGroups, classGroupsCount } from './class-groups';
import { config } from './class-order.tailwind-merge';

describe('classGroups validation', () => {
  const tailwindGroupIds = Object.keys(config.classGroups);

  it('should match classGroupsCount with classGroups length + 1', () => {
    expect(classGroupsCount).toBe(classGroups.length + 1);
  });

  it('should not contain any duplicate groupIds across class groups', () => {
    const seen = new Set<string>();
    const duplicates: string[] = [];

    for (const groupList of classGroups) {
      for (const id of groupList) {
        if (seen.has(id)) {
          duplicates.push(id);
        }
        seen.add(id);
      }
    }

    expect(
      duplicates,
      `Found duplicate groupIds: ${duplicates.join(', ')}`,
    ).toEqual([]);
  });

  it('should not contain any extraneous groupIds not present in tailwind-merge', () => {
    const validGroupIdsSet = new Set(tailwindGroupIds);
    const extraGroupIds: string[] = [];

    for (const groupList of classGroups) {
      for (const id of groupList) {
        if (!validGroupIdsSet.has(id)) {
          extraGroupIds.push(id);
        }
      }
    }

    expect(
      extraGroupIds,
      `Found extraneous groupIds not in tailwind-merge: ${extraGroupIds.join(', ')}`,
    ).toEqual([]);
  });

  it('should not omit any groupIds defined in tailwind-merge', () => {
    const declaredGroupIdsSet = new Set<string>();
    for (const groupList of classGroups) {
      for (const id of groupList) {
        declaredGroupIdsSet.add(id);
      }
    }

    const missingGroupIds = tailwindGroupIds.filter(
      id => !declaredGroupIdsSet.has(id),
    );

    expect(
      missingGroupIds,
      `Missing the following groupIds from tailwind-merge: ${missingGroupIds.join(', ')}`,
    ).toEqual([]);
  });

  it('should have the exact total declared count equal to tailwind-merge classGroups count', () => {
    const totalDeclared = classGroups.reduce(
      (sum, groupList) => sum + groupList.length,
      0,
    );
    expect(totalDeclared).toBe(tailwindGroupIds.length);
  });
});
