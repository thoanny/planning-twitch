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
  css: ["~/assets/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "dayjs-nuxt", "@pinia/nuxt"],
  dayjs: {
    locales: ["fr"],
    defaultLocale: "fr",
    defaultTimezone: "Europe/Paris",
    plugins: ["weekday", "timezone"],
  },
});
