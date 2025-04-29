import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/aminaa/"
  server: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg'],
    port: 5181,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api') // Сохраняем /api в пути
      }
    }
  }
});
