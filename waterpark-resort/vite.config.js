import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Raise the warning threshold — anything under 600kB is fine for a resort app
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual chunking: keep vendor libs in predictable separate files
        manualChunks(id) {
          // React core — loads first, always cached
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // React Router
          if (id.includes('node_modules/react-router') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-router';
          }
          // Framer Motion — large lib, isolated chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // React Icons — tree-shakeable but still worth isolating
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons';
          }
          // Lenis smooth scroll
          if (id.includes('node_modules/@studio-freight/lenis')) {
            return 'vendor-lenis';
          }
          // Everything else in node_modules → shared vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
        },
      },
    },
  },
});
