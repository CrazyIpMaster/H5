import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Uploads/sdbwgshuzizhanting/fushizhanlan/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          utils: ['zustand', 'html2canvas']
        }
      }
    },
    minify: 'esbuild'
  },
  server: {
    host: true,
    port: 3000
  }
})
