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
        },
        // 优化资源文件名，便于缓存
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          // 图片资源使用内容哈希
          if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // 音视频资源
          if (/\.(mp3|mp4|m4a|wav|ogg|webm)$/i.test(name)) {
            return 'assets/media/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    minify: 'esbuild',
    // 优化资源处理
    assetsInlineLimit: 8192, // 8KB 以下的资源内联为 base64（减少请求数）
    chunkSizeWarningLimit: 1000,
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 生成 sourcemap 用于调试（生产环境可关闭）
    sourcemap: false,
    // 压缩选项
    target: 'es2020',
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
