import { defineConfig } from 'vite';

export default defineConfig({
  base: '/home/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
});
