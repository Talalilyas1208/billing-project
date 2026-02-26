import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react() ,
     tailwindcss(),
  ],
  server: {
    proxy: {
    
      '/api': {
        target: 'http://localhost:8080', // Send it to your mock server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' before it hits the mock server
      },
    },}
})
