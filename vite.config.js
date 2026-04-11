import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // This will create .gz versions of your 16MB assets so 
    // modern browsers can download them even faster.
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    // We turn sourcemaps off for the final build to save space
    sourcemap: false, 
    // This helps manage large assets like your GIFs
    chunkSizeWarningLimit: 2000, 
    rollupOptions: {
      output: {
        // This organizes your dist folder better
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})