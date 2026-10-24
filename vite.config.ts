import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({plugins:[react(),VitePWA({registerType:'autoUpdate',includeAssets:['icon.svg','apple-touch-icon.png'],manifest:{name:'HabitFlow — Habit Tracker',short_name:'HabitFlow',description:'Your offline-first habit tracker',theme_color:'#0d1f19',background_color:'#0d1f19',display:'standalone',start_url:'/',scope:'/',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'},{src:'/icon-maskable.png',sizes:'512x512',type:'image/png',purpose:'maskable'}]},workbox:{navigateFallback:'/index.html',globPatterns:['**/*.{js,css,html,ico,png,svg,woff2}']}})]});
