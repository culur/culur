import Vue from '@vitejs/plugin-vue';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import Markdown from 'vite-plugin-vue-markdown';
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    VueRouter(),
    Vue(),
    Layouts(),
    Markdown(),
    AutoImport({
      imports: [VueRouterAutoImports],
    }),
    Components({}),
    Inspect(),
    nodePolyfills(),
  ],
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [polyfillNode()],
    },
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
