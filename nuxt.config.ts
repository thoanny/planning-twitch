// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      localStorage: {
        events: "twitch-planning-events",
        settings: "twitch-planning-settings",
      },
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  css: ["~/assets/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
});
