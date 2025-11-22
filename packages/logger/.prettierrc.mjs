import defineConfig from '@culur/config-prettier/factory';

/**
 * @type {import("prettier-plugin-embed").PluginEmbedOptions}
 */
const prettierPluginEmbedConfig = {
  embeddedOverrides: JSON.stringify([
    {
      tags: 'js',
      options: {
        semi: false,
        endOfLine: 'lf',
        singleQuote: false,
        quoteProps: 'preserve',
      },
    },
  ]),
};

const config = defineConfig({
  plugins: ['prettier-plugin-embed'],
  overrides: [
    {
      files: ['./src/item/**/*', './scripts/**/*'],
      options: {
        printWidth: 300,
      },
    },
    {
      files: ['./src/components/line.tsx'],
      options: {
        printWidth: 120,
      },
    },
  ],
});

export default {
  ...prettierPluginEmbedConfig,
  ...config,
};
