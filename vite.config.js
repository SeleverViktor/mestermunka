// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_APP_TITLE': JSON.stringify('Az én weboldalam'), // Cím beállítása
  },
});


