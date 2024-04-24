import colors from "~/data/colors.json";
import patterns from "~/data/patterns.json";

const dayjs = useDayjs();

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

  const getTitleAuto = () => {
    const start = dayjs(data.value.date.start ?? undefined).weekday(0);
    const end = dayjs(data.value.date.start ?? undefined).weekday(6);
    let startFormat = "D";
    let endFormat = "D MMMM YYYY";

    if (data.value.date.short) {
      endFormat = "D MMM YYYY";
    }

    if (start.month() !== end.month()) {
      startFormat += data.value.date.short ? " MMM" : " MMMM";
    }

    if (start.year() !== end.year()) {
      startFormat += " YYYY";
    }

    return `Planning du ${start.format(startFormat)} au ${end.format(
      endFormat
    )}`;
  };

  return { data, initSettings, getTitleAuto };
});
