import type { ConfigExtension } from 'tailwind-merge-ts';
import type { AnyThemeGroupIds } from 'tailwind-merge-ts/lib/types';
import { getDefaultConfig, mergeConfigs } from 'tailwind-merge-ts';
import { createConfigUtils } from 'tailwind-merge-ts/lib/config-utils';

type ExtendedGroups = 'group' | 'peer';

const isGroupNamed = (value: string) => value.startsWith('group/');
const isPeerNamed = (value: string) => value.startsWith('peer/');

const configExtend: ConfigExtension<
  ExtendedGroups,
  AnyThemeGroupIds
>['extend'] = {
  classGroups: {
    group: ['group', isGroupNamed],
    peer: ['peer', isPeerNamed],
  },
};

// Initialize singleton config utils once at module evaluation
export const config = mergeConfigs<ExtendedGroups>(getDefaultConfig(), {
  extend: configExtend,
});

export const configUtils = createConfigUtils(config);
