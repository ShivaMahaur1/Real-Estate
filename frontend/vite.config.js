// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will forward any request that starts with /api
      // to your backend server running on http://localhost:5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // This is needed to avoid CORS issues
        // No need to rewrite the path since your backend expects /api/...
      },
    },
  },
});