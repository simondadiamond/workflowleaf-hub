import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests to backend if needed
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
