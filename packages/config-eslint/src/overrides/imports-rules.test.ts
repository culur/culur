import { assert, it } from 'vitest';
import { defineOverride } from '~/types';
import { importsRules } from './imports-rules';

it('should be valid rule', async () => {
  assert('partialConfig' in importsRules);
  const [name, config] = defineOverride(importsRules);

  assert(name === 'antfu/imports/rules');
  assert(typeof config === 'object');
  const configLocal = config;

  assert(configLocal.rules);

  assert.containsAllKeys(configLocal.rules, [
    'import/no-deprecated',
    'import/consistent-type-specifier-style',
  ]);
});
