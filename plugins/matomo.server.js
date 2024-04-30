import { defineNuxtPlugin } from "#app";
import VueMatomo from "vue-matomo";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMatomo, {
    host: "https://analytics.an-d.me",
    siteId: 14,
    router: nuxtApp.$router,
    disableCookies: true,
  });
});
