import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.RENDER_INTERNAL_HOSTNAME ? `http://${process.env.RENDER_INTERNAL_HOSTNAME}:3000` : 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
