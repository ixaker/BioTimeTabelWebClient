import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Table',
        short_name: 'Table',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
          "icons": [
            {"src":"/logo_192.png","sizes":"192x192","type":"image/png"},
            {"src":"/logo_96.png","sizes":"96x96","type":"image/png"},
            {"src":"/logo_72.png","sizes":"72x72","type":"image/png"},
            {"src":"/logo_48.png","sizes":"48x48","type":"image/png"}
        ],
      }
    })
  ]

})
