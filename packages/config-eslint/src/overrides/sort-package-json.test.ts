import { sortPackageJson as sortPackageJsonAntfuFunction } from '@antfu/eslint-config';
import { assert, it } from 'vitest';
import { sortPackageJson as sortPackageJsonLocalOverride } from './sort-package-json';
import { defineOverride } from '~/types';

it('should be valid rule', async () => {
  const [configAntfu] = await sortPackageJsonAntfuFunction();

  const [name, config] = defineOverride(sortPackageJsonLocalOverride);

  assert(name === 'antfu/sort/package-json');
  assert(typeof config === 'function');
  const configLocal = await config();

  assert(configLocal.rules);
  assert(configAntfu.rules);

  assert.deepEqual(
    configLocal.rules['jsonc/sort-array-values'],
    configAntfu.rules['jsonc/sort-array-values'],
  );

  assert.containsAllKeys(
    configLocal.rules, //
    Object.keys(configAntfu.rules),
  );
});
