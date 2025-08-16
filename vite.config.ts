import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Se actualiza solo cuando haya cambios
      devOptions: {
        enabled: true, // habilita PWA en modo desarrollo
      },
      manifest: {
        name: 'Cooky App de Recetas',
        short_name: 'Cooky',
        description: 'Aplicación de recetas con IA',
        theme_color: '#f59e0b', 
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/login',
        icons: [
          {
            src: "/icon192x192.png",
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: "/icon512x512.png",
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              }
            }
          }
        ]
      }
    })
  ],
})
