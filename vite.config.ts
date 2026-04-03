import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/introduction/' : '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['remotion', '@remotion/player', '@remotion/transitions'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          remotion: ['remotion', '@remotion/player', '@remotion/transitions'],
          gsap: ['gsap'],
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: 'all',
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
}))
