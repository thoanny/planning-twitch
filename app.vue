<script setup>
import domtoimage from "dom-to-image-more";
import debounce from "lodash/debounce";
import days from "~/data/days.json";

useSeoMeta({
  title: "Planning Twitch | Thoanny",
  ogTitle: "Planning Twitch | Thoanny",
  description:
    "Générateur de planning Twitch personnalisé et gratuit, aux formats paysage et portrait, pour une large diffusion sur vos réseaux sociaux numériques.",
  ogDescription:
    "Générateur de planning Twitch personnalisé et gratuit, aux formats paysage et portrait, pour une large diffusion sur vos réseaux sociaux numériques.",
  ogImage: "/planning-twitch.jpg",
  twitterCard: "summary_large_image",
});

const runtimeConfig = useRuntimeConfig();

const renders = [
  {
    key: "landscapeTab",
    label: "Paysage (1920 × 1080 px)",
  },
  {
    key: "portraitTab",
    label: "Portrait (1080 × 1920 px)",
  },
];

const eventsStore = useEventsStore();
const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);

const landscape = ref();
const portrait = ref();
const imageLandscape = ref();
const imagePortrait = ref();

const loadLandscapeImage = debounce(() => {
  domtoimage
    .toPng(document.querySelector("#landscape"), {
      width: 1920,
      height: 1080,
      copyDefaultStyles: false,
    })
    .then(function (dataUrl) {
      imageLandscape.value = dataUrl;
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}, 500);

const loadPortraitImage = debounce(() => {
  domtoimage
    .toPng(document.querySelector("#portrait"), {
      width: 1080,
      height: 1920,
      copyDefaultStyles: false,
    })
    .then(function (dataUrl) {
      imagePortrait.value = dataUrl;
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}, 500);

onMounted(() => {
  const eventsLocal = localStorage.getItem(
    runtimeConfig.public.localStorage.events
  );
  eventsStore.initEvents(eventsLocal ? JSON.parse(eventsLocal) : []);

  const settingsLocal = localStorage.getItem(
    runtimeConfig.public.localStorage.settings
  );
  settingsStore.initSettings(settingsLocal ? JSON.parse(settingsLocal) : null);
});

const saveSettings = debounce(() => {
  localStorage.setItem(
    runtimeConfig.public.localStorage.settings,
    JSON.stringify(settings.value)
  );
}, 300);

eventsStore.$subscribe(() => {
  loadLandscapeImage();
  loadPortraitImage();
});

settingsStore.$subscribe(() => {
  loadLandscapeImage();
  loadPortraitImage();
  saveSettings();
});

const handleDownloadImage = (orientation) => {
  var link = document.createElement("a");

  if ("landscape" === orientation) {
    link.download = "planning-twitch-paysage.png";
    link.href = imageLandscape.value;
  } else {
    link.download = "planning-twitch-portrait.png";
    link.href = imagePortrait.value;
  }

  link.click();
};

const toast = useToast();

const handleEventImageError = (e) => {
  console.log(e);
  toast.add({
    id: e.target.alt,
    title: "Erreur",
    description:
      "Impossible de charger l'image de l'événément \"" + e.target.alt + '"',
    icon: "i-heroicons-exclamation-triangle",
    timeout: 10000,
    color: "red",
  });
  e.target.src = "/image-error.png";
};
</script>

<template>
  <div
    class="flex flex-col-reverse lg:flex-row gap-4 h-full p-4 mx-auto container"
  >
    <div class="lg:max-w-sm shrink-0 w-full">
      <AppSidebar />
    </div>
    <div class="flex-1">
      <UTabs :items="renders" class="w-full">
        <template #item="{ item }">
          <UCard
            class="bg-pattern-bathroom-floor"
            :class="`font-${settings.font.id}`"
            :ui="{
              body: {
                padding: 'p-2 md:p-4',
              },
            }"
          >
            <div v-if="item.key === 'landscapeTab'" class="space-y-3">
              <img
                :src="imageLandscape"
                v-if="imageLandscape"
                @contextmenu.prevent="handleDownloadImage('landscape')"
              />
              <div class="aspect-video flex items-center justify-center" v-else>
                <UProgress animation="swing" class="max-w-xl" />
              </div>

              <div class="hidden">
                <div
                  :class="[
                    `bg-${settings.background.color.id}-600 text-${settings.background.color.id}-50 bg-pattern-${settings.background.pattern.id}`,
                    'text-white flex flex-col items-center justify-center h-full w-full p-8 py-16 gap-12',
                  ]"
                  ref="landscape"
                  id="landscape"
                  style="width: 1920px; height: 1080px"
                >
                  <div
                    class="text-6xl uppercase text-center"
                    v-text="settings.title.text"
                  ></div>
                  <div class="flex h-full w-full gap-8 max-w-[1720px]">
                    <div
                      class="flex flex-col overflow-hidden"
                      :class="[
                        !eventsStore.findByDay(day.id).length
                          ? 'basis-1/3'
                          : 'basis-full',
                        settings.hideEmpty &&
                        !eventsStore.findByDay(day.id).length
                          ? 'hidden'
                          : '',
                      ]"
                      v-for="day in days"
                      :key="day.id"
                    >
                      <div class="text-3xl uppercase text-center my-4">
                        {{
                          !eventsStore.findByDay(day.id).length
                            ? day.label.slice(0, 3) + "."
                            : day.label
                        }}
                      </div>
                      <div
                        v-if="eventsStore.findByDay(day.id).length"
                        class="flex flex-1 gap-4 flex-col"
                      >
                        <div
                          v-for="event in eventsStore.findByDay(day.id)"
                          :key="event.id"
                          :class="[
                            `bg-${settings.background.color.id}-700 border-${settings.background.color.id}-800`,
                            settings.borderRadius ? 'rounded-xl' : '',
                            'flex flex-col justify-between grow border-2 text-white items-center justify-center relative overflow-hidden',
                          ]"
                        >
                          <div
                            :class="[
                              `bg-${settings.background.color.id}-800 border-${settings.background.color.id}-800 text-${settings.background.color.id}-50`,
                              settings.borderRadius ? 'rounded-b-xl' : '',
                              'relative z-20 py-2 px-4 text-2xl text-center tracking-wide border-2 !border-t-0',
                            ]"
                            v-if="event.start"
                          >
                            {{ event.start }}
                            <span v-if="event.end">
                              &bull; {{ event.end }}</span
                            >
                          </div>
                          <div v-else></div>
                          <div
                            :class="[
                              `bg-${settings.background.color.id}-800 border-${settings.background.color.id}-800 text-${settings.background.color.id}-50`,
                              settings.borderRadius ? 'rounded-t-xl' : '',
                              'relative z-20 py-2 px-4 text-2xl text-center font-semibold tracking-wide border-2 !border-b-0',
                            ]"
                            v-if="event.title"
                          >
                            {{ event.title }}
                          </div>

                          <img
                            :src="event.image"
                            :alt="event.title"
                            v-if="event.image"
                            @error="handleEventImageError"
                            class="w-full h-full object-cover absolute top-0 left-0 z-10"
                          />
                        </div>
                      </div>
                      <div class="flex flex-1 gap-6 flex-col" v-else>
                        <div
                          :class="[
                            `bg-${settings.background.color.id}-700 text-${settings.background.color.id}-500`,
                            settings.borderRadius ? 'rounded-xl' : '',
                            'flex grow items-center justify-center text-3xl font-bold uppercase tracking-widest',
                          ]"
                          style="
                            writing-mode: vertical-rl;
                            text-orientation: mixed;
                          "
                        >
                          Hors ligne
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-12">
                    <div
                      class="flex gap-4 items-center"
                      v-if="settings.links.instagram"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          class="w-16 h-16"
                          fill="currentColor"
                        >
                          <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                          />
                        </svg>
                      </div>
                      <div class="tracking-wide uppercase">
                        <div class="text-xl">Instagram</div>
                        <div class="text-2xl font-semibold">
                          {{ settings.links.instagram }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex gap-4 items-center"
                      v-if="settings.links.twitter"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          class="w-16 h-16"
                          fill="currentColor"
                        >
                          <path
                            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                          />
                        </svg>
                      </div>
                      <div class="tracking-wide uppercase">
                        <div class="text-xl">X (Twitter)</div>
                        <div class="text-2xl font-semibold">
                          {{ settings.links.twitter }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex gap-4 items-center"
                      v-if="settings.links.youtube"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                          class="w-16 h-16"
                          fill="currentColor"
                        >
                          <path
                            d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                          />
                        </svg>
                      </div>
                      <div class="tracking-wide uppercase">
                        <div class="text-xl">YouTube</div>
                        <div class="text-2xl font-semibold">
                          {{ settings.links.youtube }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex gap-4 items-center"
                      v-if="settings.links.tiktok"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          class="w-16 h-16"
                          fill="currentColor"
                        >
                          <path
                            d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                          />
                        </svg>
                      </div>
                      <div class="tracking-wide uppercase">
                        <div class="text-xl">TikTok</div>
                        <div class="text-2xl font-semibold">
                          {{ settings.links.tiktok }}
                        </div>
                      </div>
                    </div>
                    <div
                      :class="[
                        `bg-${settings.background.color.id}-50 text-${settings.background.color.id}-600`,
                        settings.borderRadius ? 'rounded-xl' : '',
                        'flex gap-4 items-center flex-1 py-4 px-4',
                      ]"
                      v-if="settings.links.twitch"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          class="w-16 h-16"
                          fill="currentColor"
                        >
                          <path
                            d="M391.2 103.5H352.5v109.7h38.6zM285 103H246.4V212.8H285zM120.8 0 24.3 91.4V420.6H140.1V512l96.5-91.4h77.3L487.7 256V0zM449.1 237.8l-77.2 73.1H294.6l-67.6 64v-64H140.1V36.6H449.1z"
                          />
                        </svg>
                      </div>
                      <div class="tracking-wide uppercase">
                        <div class="text-xl">Rendez-vous sur</div>
                        <div class="text-2xl font-semibold">
                          twitch.tv/{{ settings.links.twitch }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="item.key === 'portraitTab'" class="space-y-3">
              <img
                :src="imagePortrait"
                alt=""
                v-if="imagePortrait"
                class="object-contain w-full h-full lg:aspect-video"
                @contextmenu.prevent="handleDownloadImage('portrait')"
              />
              <div class="hidden">
                <!-- <div> -->
                <div
                  :class="[
                    `bg-${settings.background.color.id}-600 text-${settings.background.color.id}-50 bg-pattern-${settings.background.pattern.id}`,
                    'text-white flex flex-col items-center justify-center h-full w-full p-16 pt-[11rem] pb-[8rem] gap-12',
                  ]"
                  ref="portrait"
                  id="portrait"
                  style="width: 1080px; height: 1920px"
                >
                  <div
                    class="text-5xl font-semibold uppercase text-center"
                    v-text="settings.title.text"
                  ></div>
                  <div class="flex flex-col h-full w-full gap-4 container">
                    <div
                      class="flex flex-col overflow-hidden min-h-36"
                      :class="[
                        !eventsStore.findByDay(day.id).length
                          ? 'basis-1/3'
                          : 'basis-full',
                        settings.hideEmpty &&
                        !eventsStore.findByDay(day.id).length
                          ? 'hidden'
                          : '',
                      ]"
                      v-for="day in days"
                      :key="day.id"
                    >
                      <div class="text-4xl uppercase text-center my-4">
                        {{ day.label }}
                      </div>
                      <div
                        v-if="eventsStore.findByDay(day.id).length"
                        class="flex flex-1 gap-4"
                      >
                        <div
                          v-for="event in eventsStore.findByDay(day.id)"
                          :key="event.id"
                          :class="[
                            `bg-${settings.background.color.id}-700 border-${settings.background.color.id}-800`,
                            settings.borderRadius ? 'rounded-xl' : '',
                            'flex flex-col w-full border-2 text-white items-center justify-end relative overflow-hidden',
                          ]"
                        >
                          <div
                            :class="[
                              `bg-${settings.background.color.id}-800 border-${settings.background.color.id}-800 text-${settings.background.color.id}-50`,
                              settings.borderRadius ? 'rounded-t-xl' : '',
                              'relative z-20 py-2 px-4 text-3xl text-center font-semibold tracking-wide border-2 !border-b-0',
                            ]"
                            v-if="event.title"
                          >
                            <span v-if="event.start" class="font-normal">
                              {{ event.start }}
                              <span v-if="event.end">
                                &bull; {{ event.end }}</span
                              >
                              <br />
                            </span>
                            {{ event.title }}
                          </div>

                          <img
                            :src="event.image"
                            :alt="event.title"
                            v-if="event.image"
                            @error="handleEventImageError"
                            class="w-full h-full object-cover absolute top-0 left-0 z-10"
                          />
                        </div>
                      </div>
                      <div class="flex flex-1 gap-6 flex-col" v-else>
                        <div
                          :class="[
                            `bg-${settings.background.color.id}-700 text-${settings.background.color.id}-500`,
                            settings.borderRadius ? 'rounded-xl' : '',
                            'flex grow items-center justify-center text-3xl font-bold uppercase tracking-widest',
                          ]"
                        >
                          Hors ligne
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-12">
                    <div
                      :class="[
                        `bg-${settings.background.color.id}-50 text-${settings.background.color.id}-600`,
                        settings.borderRadius ? 'rounded-xl' : '',
                        'flex gap-4 items-center flex-1 py-5 px-6',
                      ]"
                      v-if="settings.links.twitch"
                    >
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          class="w-10 h-10"
                          fill="currentColor"
                        >
                          <path
                            d="M391.2 103.5H352.5v109.7h38.6zM285 103H246.4V212.8H285zM120.8 0 24.3 91.4V420.6H140.1V512l96.5-91.4h77.3L487.7 256V0zM449.1 237.8l-77.2 73.1H294.6l-67.6 64v-64H140.1V36.6H449.1z"
                          />
                        </svg>
                      </div>
                      <div
                        class="tracking-wide uppercase flex gap-2 items-center"
                      >
                        <div class="text-3xl">Rendez-vous sur</div>
                        <div class="text-3xl font-semibold">
                          twitch.tv/{{ settings.links.twitch }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>
    <UNotifications />
  </div>
</template>

<style scoped>
.border-2 {
  border-width: 3px;
}
</style>
