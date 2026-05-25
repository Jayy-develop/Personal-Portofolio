import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
=======

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
>>>>>>> 860324800f4424f00784c63bd8f8713db7790ba5
  },
})
