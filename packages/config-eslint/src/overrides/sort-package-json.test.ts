import { sortPackageJson as sortPackageJsonAntfuFunction } from '@antfu/eslint-config';
import { assert, it } from 'vitest';
import { sortPackageJson as sortPackageJsonLocalOverride } from './sort-package-json';

it('should be valid rule', async () => {
  const [sortPackageJsonAntfu] = await sortPackageJsonAntfuFunction();

  const sortPackageJsonLocal =
    typeof sortPackageJsonLocalOverride.config === 'function'
      ? await sortPackageJsonLocalOverride.config()
      : sortPackageJsonLocalOverride.config;

  assert(sortPackageJsonLocal.rules);
  assert(sortPackageJsonAntfu.rules);

  assert.deepEqual(
    sortPackageJsonLocal.rules['jsonc/sort-array-values'],
    sortPackageJsonAntfu.rules['jsonc/sort-array-values'],
  );

  assert.containsAllKeys(
    sortPackageJsonLocal.rules,
    Object.keys(sortPackageJsonAntfu.rules),
  );
});
