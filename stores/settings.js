import colors from "~/data/colors.json";
import patterns from "~/data/patterns.json";

export const useSettingsStore = defineStore("settings", () => {
  const data = ref({
    background: {
      color: colors.find((color) => color.id === "purple"),
      pattern: patterns.find((pattern) => pattern.id === "topography"),
    },
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

    data.value = settings;
  };

  return { data, initSettings };
});
