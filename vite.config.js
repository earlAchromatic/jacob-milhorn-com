import { defineConfig } from 'vite';
import path from 'path';

console.log(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
