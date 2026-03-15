import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable CSS code splitting for lazy-loaded routes
    cssCodeSplit: true,
    // Use esbuild for minification (built-in, fast, removes console/debugger)
    minify: 'esbuild',
    // Manual chunk splitting to prevent monolithic vendor bundle
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-gsap': ['gsap'],
          'vendor-ogl': ['ogl'],
        },
      },
    },
    // Target modern browsers for smaller output
    target: 'es2020',
    // Report compressed size for build analysis
    reportCompressedSize: true,
  },
  esbuild: {
    // Drop console.log and debugger in production
    ...(mode === 'production' && {
      drop: ['console', 'debugger'] as const,
    }),
  },
}));
