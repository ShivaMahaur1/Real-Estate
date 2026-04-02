// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // important for production build, ensures assets load correctly
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // backend server
        changeOrigin: true,
      },
    },
  },
});
