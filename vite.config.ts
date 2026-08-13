import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: '/',
        name: '美团跑腿核心链路体验优化',
        short_name: '美团跑腿',
        description: '美团跑腿帮取送核心交互链路体验优化原型',
        lang: 'zh-CN',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#f4f5f7',
        theme_color: '#fee42b',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /\.woff2$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'mtpaotui-fonts-v1',
              cacheableResponse: { statuses: [0, 200] },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 120,
              },
            },
          },
        ],
      },
    }),
  ],
});
