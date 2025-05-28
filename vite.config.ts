import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    /*{
      name: 'inject-react-devtools',
      apply: 'serve',
      transformIndexHtml(html) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              attrs: {
                src: 'http://localhost:8097',
              },
              injectTo: 'head',
            },
          ],
        };
      },
    },*/ 
  ],
})
