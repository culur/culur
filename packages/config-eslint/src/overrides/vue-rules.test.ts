import { assert, it } from 'vitest';
import { vueRules } from './vue-rules';
import { defineOverride } from '~/types';

it('should be valid rule', async () => {
  assert('partialConfig' in vueRules);
  const [name, config] = defineOverride(vueRules);

  assert(name === 'antfu/vue/rules');
  assert(typeof config === 'object');
  const configLocal = config;

  assert(configLocal.rules);

  assert.containsAllKeys(configLocal.rules, [
    'vue/singleline-html-element-content-newline',
    'vue/multiline-html-element-content-newline',
  ]);
});
