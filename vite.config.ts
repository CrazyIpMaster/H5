import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/H5/',
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
    minify: 'esbuild',
    // 优化资源处理
    assetsInlineLimit: 4096, // 4KB 以下的资源内联为 base64
    chunkSizeWarningLimit: 1000, // 提高警告阈值
  },
  server: {
    host: true,
    port: 3000
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'zustand']
  }
})
