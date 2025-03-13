import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { vitePluginForArco } from '@arco-plugins/vite-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginForArco()],
  css: {
    modules: {
      localsConvention: 'dashesOnly',
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@arco-design/web-react/dist/css':
        '/node_modules/@arco-design/web-react/dist/css',
    },
  },
});
