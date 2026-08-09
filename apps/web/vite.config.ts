import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@365-goals/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
