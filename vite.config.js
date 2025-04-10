import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/backend',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
  define: {
    'process.env.VITE_APP_TITLE': JSON.stringify('Az én weboldalam'), // Cím beállítása
  }
});
