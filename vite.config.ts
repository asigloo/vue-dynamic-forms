import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components';

import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons';

const { resolve } = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    ViteComponents({
      dirs: ['src/components', 'demos/vue-3/src/components'],
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '', // <--
      }),
    }),
    ViteIcons({}),
  ],
});
