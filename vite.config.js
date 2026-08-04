import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: false, // si el 5173 está ocupado, prueba otro puerto en vez de fallar
    hmr: {
      overlay: true, // muestra los errores de compilación en el navegador
    },
  },
})
