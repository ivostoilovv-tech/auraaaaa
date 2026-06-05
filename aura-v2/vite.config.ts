import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works both at the dev root and when served
  // from a GitHub Pages project subpath (naydenovv.github.io/Aura-Design/).
  base: './',
  plugins: [react(), tailwindcss()],
})
