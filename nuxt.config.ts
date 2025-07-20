export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",

  devtools: { enabled: true },

  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/test-utils",
    "@rstore/nuxt",
    "@nuxtjs/supabase",
    '@nuxt/test-utils/module',
    "@nuxtjs/tailwindcss",
  ],

  supabase: {
    redirectOptions: {
      exclude: ["/questions**", "/tags**", "/", "/signup"],
      login: "/login",
      callback: "/confirm",
    },
  },

  icon: {
    mode: "svg",
  },

  fonts: {
    families: [
      {
        name: "General Sans",
        provider: "fontshare",
        weights: [200, 400, 500],
      },
    ],
  },
});