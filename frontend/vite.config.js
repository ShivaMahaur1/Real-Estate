// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ensures CSS, JS, images load correctly in production
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // backend in dev
        changeOrigin: true,
        secure: false,
      },
    },
  },
});