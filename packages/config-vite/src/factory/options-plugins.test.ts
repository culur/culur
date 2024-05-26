import { expect, it } from 'vitest';
import { defineConfigPlugins } from './options-plugins';

it('defineConfigPlugins', () => {
  const plugins = defineConfigPlugins({
    pluginTsconfigPaths: true,
  });
  expect(plugins).toHaveLength(1);
});
