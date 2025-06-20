import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/test-utils'],
  
  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],
  
  icon: {
    mode: "svg",
  },

  fonts: {
    families: [
      {
        name: "General Sans",
        provider: "fontshare",
        weights: [400, 500, 600],
      },
    ],
  },
})