import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Prevent frontend from bundling backend-only supabase.ts
      'src/lib/supabase.ts': path.resolve(__dirname, 'src/lib/supabase.ts'),
    },
  },
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
