import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 关键修改：使用相对路径
  define: {
    'process.env': {}
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
});