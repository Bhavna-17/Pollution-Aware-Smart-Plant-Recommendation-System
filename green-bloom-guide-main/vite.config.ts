/**
 * PlantWise - Vite Configuration
 * 
 * Optimized build configuration for PlantWise application
 * Includes path aliases and development server settings
 * 
 * @author PlantWise Team
 * @since 1.0.0
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Allow external connections for development
    port: 8080,
    hmr: {
      overlay: false, // Disable error overlay for cleaner dev experience
    },
  },
  plugins: [
    react({
      // Fast Refresh for development
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      // Clean import paths using @ alias
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimized build settings for production
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast'],
          utils: ['framer-motion', 'lucide-react'],
        },
      },
    },
    sourcemap: mode === 'development', // Source maps only in development
  },
}));
