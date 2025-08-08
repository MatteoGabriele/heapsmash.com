export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",

  devtools: { enabled: true },

  css: ['highlight.js/styles/panda-syntax-dark.min.css'],

  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/test-utils",
    "@rstore/nuxt",
    "@nuxtjs/supabase",
    '@nuxt/test-utils/module',
    "@nuxtjs/tailwindcss",
  ],
  
  runtimeConfig: {
    public: {
      siteUrl: ''
    }
  },


  supabase: {
    redirectOptions: {
      saveRedirectToCookie: true,
      exclude: ["/questions**", "/", "/tags**", "/signup", "/landing"],
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