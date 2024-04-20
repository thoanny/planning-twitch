// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "dayjs-nuxt"],
  dayjs: {
    locales: ["fr"],
    defaultLocale: "fr",
    defaultTimezone: "Europe/Paris",
    plugins: ["weekday", "timezone"],
  },
});
