import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import yaml from '@rollup/plugin-yaml';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Markdown from 'unplugin-vue-markdown/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    VueI18nPlugin({}),
    VueRouter({
      extensions: ['.page.vue', '.vue', '.md'],
      importMode: 'async',
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }), // ⚠️ Vue must be placed after VueRouter()
    Layouts(),
    Markdown({
      headEnabled: true,
    }),
    AutoImport({
      imports: [VueRouterAutoImports],
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Inspect(),
    nodePolyfills(),
    yaml(),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    devSourcemap: true,
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `
    //       @use 'sass:color';
    //       @use 'sass:list';
    //       @use 'sass:math';
    //       @import '@/styles/global.scss';
    //     `,
    //   },
    // },
  },
});
