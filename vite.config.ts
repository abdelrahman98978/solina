import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normId = id.replace(/\\/g, '/');
          if (normId.includes('node_modules/react') || normId.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (normId.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (normId.includes('/src/data/toyotaData')) {
            return 'fleet-data';
          }
        },
      },
    },
  },
})
