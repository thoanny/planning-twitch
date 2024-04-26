import colors from "~/data/colors.json";
import patterns from "~/data/patterns.json";
import fonts from "~/data/fonts.json";

export const useSettingsStore = defineStore("settings", () => {
  const data = ref({
    background: {
      color: colors.find((color) => color.id === "purple"),
      pattern: patterns.find((pattern) => pattern.id === "topography"),
    },
    font: fonts.find((font) => font.id === "sans"),
    borderRadius: true,
    title: {
      auto: true,
      text: "Mon planning Twitch",
    },
    date: {
      start: null,
      short: false,
    },
    hideEmpty: false,
    links: {
      twitch: "",
      instagram: "",
      twitter: "",
      youtube: "",
      tiktok: "",
    },
  });

  const initSettings = (settings) => {
    console.log("initSettings");
    if (!settings) return;

    if (typeof settings.font === "undefined") {
      settings.font = fonts.find((font) => font.id === "sans");
    }

    data.value = settings;
  };

  return { data, initSettings };
});
