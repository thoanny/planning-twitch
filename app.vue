<script setup>
import domtoimage from "dom-to-image-more";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash/debounce";

const sidebar = [
  {
    key: "events",
    label: "Évenements",
  },
  {
    key: "settings",
    label: "Paramètres",
  },
];

const renders = [
  {
    key: "landscapeTab",
    label: "Paysage",
  },
  {
    key: "portraitTab",
    label: "Portrait",
  },
];

const colors = [
  { id: "red", name: "Rouge" },
  { id: "orange", name: "Orange" },
  { id: "amber", name: "Ambre" },
  { id: "yellow", name: "Jaune" },
  { id: "lime", name: "Citron" },
  { id: "green", name: "Vert" },
  { id: "emerald", name: "Émeraude" },
  { id: "teal", name: "Thé" },
  { id: "cyan", name: "Cyan" },
  { id: "sky", name: "Ciel" },
  { id: "blue", name: "Bleu" },
  { id: "indigo", name: "Indigo" },
  { id: "violet", name: "Violet 1" },
  { id: "purple", name: "Violet 2" },
  { id: "fuchsia", name: "Fuchsia" },
  { id: "pink", name: "Rose 1" },
  { id: "rose", name: "Rose 2" },
];

const patterns = [
  { id: "none", label: "- None -" },
  { id: "4-point-stars", label: "4 point stars" },
  { id: "anchors-away", label: "Anchors away" },
  { id: "automn", label: "Automn" },
  { id: "bubbles", label: "Bubbles" },
  { id: "charlie-brown", label: "Charlie Brown" },
  { id: "circuit-board", label: "Circuit board" },
  { id: "endless-clouds", label: "Endless clouds" },
  { id: "falling-triangles", label: "Falling triangles" },
  { id: "floating-cogs", label: "Floating cogs" },
  { id: "glamorous", label: "Glamorous" },
  { id: "i-like-food", label: "I like food" },
  { id: "hexagons", label: "Hexagons" },
  { id: "hideout", label: "Hideout" },
  { id: "overlapping-circles", label: "Overlapping circles" },
  { id: "plus", label: "Plus" },
  {
    id: "rounded-plus-connected",
    label: "Rounded plus connected",
  },
  { id: "tic-tac-toe", label: "Tic tac toe" },
  { id: "topography", label: "Topography" },
];

const userData = reactive({
  events: [
    {
      uid: "725e1870-7ab0-47c2-8856-cf743a0f3554",
      title: "Guild Wars 2",
      start: "11:00",
      end: "15:00",
      day: 3,
    },
    {
      uid: "0dd305a0-63a5-4fee-ad91-c6b43f1372e5",
      title: "No Man's Sky",
      start: "11:00",
      end: "15:00",
      day: 4,
    },
    {
      uid: "b9d68c8e-c958-4342-8caa-34109c738035",
      title: "World of Warcraft",
      start: "11:00",
      end: "16:00",
      day: 5,
    },
  ],
  style: {
    backgroundColor: colors.find((color) => color.id === "purple"),
    backgroundPattern: patterns.find((pattern) => pattern.id === "topography"),
    borderRadius: true,
  },
  content: {
    titleAuto: true,
    title: "Mon planning Twitch",
    startDate: null,
    dateShort: false,
    hideEmpty: false,
    twitch: "thoanny",
    instagram: "@thoanny__",
    twitter: "@thoanny_",
    youtube: "@thoanny_",
    tiktok: "@thoanny_",
  },
});

const landscape = ref();
const portrait = ref();
const imageLandscape = ref();
const imagePortrait = ref();

// const adjustClone = (node, clone, after) => {
//   // console.log("node:", node);
//   // console.log("clone:", clone);
//   // console.log("affter:", after);
//   if (!after && clone.id === "element") {
//     clone.style.transform = "translateY(100px)";
//   }
//   if (!after && clone.id === "landscape") {
//     clone.classList.remove("hidden");
//     console.log("clone", clone);
//   }
//   return clone;
// };

const loadLandscapeImage = debounce(() => {
  domtoimage
    .toPng(document.querySelector("#landscape"), {
      // adjustClonedNode: adjustClone,
      width: 1920,
      height: 1080,
      copyDefaultStyles: false,
    })
    .then(function (dataUrl) {
      // var img = new Image();
      imageLandscape.value = dataUrl;
      // console.log(dataUrl);
      // console.log(dataUrl);
      // document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}, 500);

const loadPortraitImage = debounce(() => {
  domtoimage
    .toPng(document.querySelector("#portrait"), {
      // adjustClonedNode: adjustClone,
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
  loadLandscapeImage();
  loadPortraitImage();
});

watch(userData, async () => {
  console.log("watched");
  loadLandscapeImage();
  loadPortraitImage();
});

const editEventModalIsOpen = ref(false);

const dayjs = useDayjs();

const getTitleAuto = () => {
  const start = dayjs(userData.content.startDate ?? undefined).weekday(0);
  const end = dayjs(userData.content.startDate ?? undefined).weekday(6);
  let startFormat = "D";
  let endFormat = "D MMMM YYYY";

  if (userData.content.dateShort) {
    endFormat = "D MMM YYYY";
  }

  if (start.month() !== end.month()) {
    startFormat += userData.content.dateShort ? " MMM" : " MMMM";
  }

  if (start.year() !== end.year()) {
    startFormat += " YYYY";
  }

  return `Planning du ${start.format(startFormat)} au ${end.format(endFormat)}`;
};

const days = [
  { id: 0, label: "Lundi" },
  { id: 1, label: "Mardi" },
  { id: 2, label: "Mercredi" },
  { id: 3, label: "Jeudi" },
  { id: 4, label: "Vendredi" },
  { id: 5, label: "Samedi" },
  { id: 6, label: "Dimanche" },
];

const newEvent = {
  uid: null,
  title: "",
  color: "",
  image: "",
  start: "",
  end: "",
  day: null,
};

const editEvent = reactive({
  type: null,
  day: days[0],
  event: newEvent,
});

const handleEditEvent = (uid = null) => {
  console.log("handleEditEvent UID", uid);
  if (uid) {
    const event = userData.events.find((event) => event.uid === uid);
    editEvent.type = "edit";
    editEvent.event = event;
    editEvent.day = days[event.day];
  } else {
    editEvent.type = "new";
    editEvent.event = { newEvent };
    editEvent.day = days[0];
  }
  editEventModalIsOpen.value = true;
};

const handleSaveEvent = () => {
  if (editEvent.type === "new") {
    editEvent.event.day = editEvent.day.id;
    editEvent.event.uid = uuidv4();
    userData.events.push(editEvent.event);
  }

  editEventModalIsOpen.value = false;
};

const handleDeleteEvent = (uid) => {
  const event = userData.events.findIndex((event) => event.uid === uid);
  if ((event) => 0) {
    userData.events.splice(event, 1);
  }
};
</script>

<template>
  <div class="flex gap-4 h-full p-4 mx-auto container">
    <div class="max-w-sm shrink-0 w-full">
      <UTabs :items="sidebar" class="w-full">
        <template #item="{ item }">
          <UCard>
            <!-- Events -->
            <div v-if="item.key === 'events'" class="space-y-3">
              <UButton
                size="sm"
                color="primary"
                icon="i-heroicons-calendar-days"
                variant="solid"
                label="Ajouter un événement"
                :trailing="false"
                @click="handleEditEvent()"
              />
              <UModal v-model="editEventModalIsOpen">
                <UCard
                  :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                  }"
                  @submit.prevent="handleSaveEvent()"
                >
                  <div class="space-y-3">
                    <UFormGroup label="Intitulé" required>
                      <UInput v-model="editEvent.event.title" required />
                    </UFormGroup>
                    <UFormGroup label="Image">
                      <UInput type="url" v-model="editEvent.event.image" />
                    </UFormGroup>
                    <div class="flex w-full gap-4">
                      <UFormGroup
                        label="Jour"
                        class="w-full"
                        v-if="editEvent.type === 'new'"
                      >
                        <USelectMenu v-model="editEvent.day" :options="days" />
                      </UFormGroup>
                      <UFormGroup label="Début" class="w-full">
                        <UInput type="time" v-model="editEvent.event.start" />
                      </UFormGroup>
                      <UFormGroup label="Fin" class="w-full">
                        <UInput type="time" v-model="editEvent.event.end" />
                      </UFormGroup>
                    </div>
                  </div>

                  <template #footer>
                    <UButton
                      icon="i-heroicons-check"
                      size="sm"
                      variant="solid"
                      label="Enregistrer"
                      :trailing="false"
                      type="submit"
                    />
                  </template>
                </UCard>
              </UModal>
              <div v-for="day in days" :key="day.id">
                <h4>{{ day.label }}</h4>
                <div
                  v-if="
                    userData.events.filter((event) => event.day === day.id)
                      .length
                  "
                  class="flex flex-col space-y-2"
                >
                  <UButtonGroup
                    size="sm"
                    orientation="horizontal"
                    v-for="event in userData.events.filter(
                      (event) => event.day === day.id
                    )"
                    :key="event.uid"
                  >
                    <UButton
                      icon="i-heroicons-pencil-square"
                      :label="event.title"
                      color="white"
                      class="flex-1"
                      @click="handleEditEvent(event.uid)"
                    />
                    <UButton
                      icon="i-heroicons-trash"
                      color="red"
                      @click="handleDeleteEvent(event.uid)"
                    />
                  </UButtonGroup>
                </div>
              </div>
            </div>
            <!-- Paramètres -->
            <div v-else-if="item.key === 'settings'" class="space-y-3">
              <h4>Apparence</h4>

              <UCheckbox
                v-model="userData.style.borderRadius"
                label="Bords arrondis"
              />

              <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                <UFormGroup label="Couleur principale" class="w-full">
                  <USelectMenu
                    v-model="userData.style.backgroundColor"
                    :options="colors"
                    option-attribute="name"
                  >
                    <template #label>
                      <span
                        :class="[
                          `bg-${userData.style.backgroundColor.id}-400`,
                          'inline-block h-4 w-4 flex-shrink-0 rounded-full',
                        ]"
                        aria-hidden="true"
                      />
                      <span class="truncate">{{
                        userData.style.backgroundColor.name
                      }}</span>
                    </template>

                    <template #option="{ option: color }">
                      <span
                        :class="[
                          `bg-${color.id}-400`,
                          'inline-block h-4 w-4 flex-shrink-0 rounded-full',
                        ]"
                        aria-hidden="true"
                      />
                      <span class="truncate">{{ color.name }}</span>
                    </template>
                  </USelectMenu>
                </UFormGroup>
                <UFormGroup label="Image de fond" class="w-full">
                  <USelectMenu
                    v-model="userData.style.backgroundPattern"
                    :options="patterns"
                  >
                  </USelectMenu>
                </UFormGroup>
              </div>

              <h4>Contenu</h4>

              <UCheckbox
                v-model="userData.content.titleAuto"
                label="Titre automatique"
              />
              <UFormGroup
                label="Date de début"
                v-if="userData.content.titleAuto"
              >
                <UInput v-model="userData.content.startDate" type="date" />
              </UFormGroup>
              <UFormGroup label="Titre du planning" v-else>
                <UInput v-model="userData.content.title" />
              </UFormGroup>
              <UCheckbox
                v-model="userData.content.dateShort"
                label="Dates en abrégé"
              />
              <UCheckbox
                v-model="userData.content.hideEmpty"
                label="Masquer les jours sans événement"
              />

              <h4>Réseaux sociaux numériques</h4>

              <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                <UFormGroup label="Twitch">
                  <UInput v-model="userData.content.twitch" />
                </UFormGroup>
                <UFormGroup label="Instagram">
                  <UInput v-model="userData.content.instagram" />
                </UFormGroup>
                <UFormGroup label="X (Twitter)">
                  <UInput v-model="userData.content.twitter" />
                </UFormGroup>
                <UFormGroup label="YouTube">
                  <UInput v-model="userData.content.youtube" />
                </UFormGroup>
                <UFormGroup label="TikTok">
                  <UInput v-model="userData.content.tiktok" />
                </UFormGroup>
              </div>
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>
    <div class="flex-1">
      <UTabs :items="renders" class="w-full">
        <template #item="{ item }">
          <UCard>
            <div v-if="item.key === 'landscapeTab'" class="space-y-3">
              <img :src="imageLandscape" v-if="imageLandscape" />

              <div class="hidden">
                <div
                  :class="[
                    `bg-${userData.style.backgroundColor.id}-600 text-${userData.style.backgroundColor.id}-50 bg-pattern-${userData.style.backgroundPattern.id}`,
                    'text-white flex flex-col items-center justify-center h-full w-full p-8 py-16 gap-12',
                  ]"
                  ref="landscape"
                  id="landscape"
                  style="width: 1920px; height: 1080px"
                >
                  <div
                    class="text-6xl font-semibold text-center"
                    v-if="!userData.content.titleAuto"
                  >
                    {{ userData.content.title }}
                  </div>
                  <div
                    class="text-6xl font-semibold text-center"
                    v-text="getTitleAuto()"
                    v-else
                  ></div>
                  <div class="flex h-full w-full gap-8 container">
                    <div
                      class="flex flex-col overflow-hidden"
                      :class="[
                        !userData.events.filter((event) => event.day === day.id)
                          .length
                          ? 'basis-1/3'
                          : 'basis-full',
                        userData.content.hideEmpty &&
                        !userData.events.filter((event) => event.day === day.id)
                          .length
                          ? 'hidden'
                          : '',
                      ]"
                      v-for="day in days"
                    >
                      <div class="text-3xl uppercase text-center my-4">
                        {{
                          userData.content.dateShort ||
                          !userData.events.filter(
                            (event) => event.day === day.id
                          ).length
                            ? day.label.slice(0, 3)
                            : day.label
                        }}
                      </div>
                      <div
                        v-if="
                          userData.events.filter(
                            (event) => event.day === day.id
                          ).length
                        "
                        class="flex flex-1 gap-4 flex-col"
                      >
                        <div
                          v-for="event in userData.events.filter(
                            (event) => event.day === day.id
                          )"
                          :class="[
                            `bg-${userData.style.backgroundColor.id}-700 border-${userData.style.backgroundColor.id}-800`,
                            userData.style.borderRadius ? 'rounded-xl' : '',
                            'flex flex-col justify-between grow border-2 text-white items-center justify-center relative overflow-hidden',
                          ]"
                        >
                          <div
                            :class="[
                              `bg-${userData.style.backgroundColor.id}-800 border-${userData.style.backgroundColor.id}-800 text-${userData.style.backgroundColor.id}-50`,
                              userData.style.borderRadius ? 'rounded-b-xl' : '',
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
                              `bg-${userData.style.backgroundColor.id}-800 border-${userData.style.backgroundColor.id}-800 text-${userData.style.backgroundColor.id}-50`,
                              userData.style.borderRadius ? 'rounded-t-xl' : '',
                              'relative z-20 py-2 px-4 text-2xl text-center font-semibold tracking-wide border-2 !border-b-0',
                            ]"
                            v-if="event.title"
                          >
                            {{ event.title }}
                          </div>

                          <img
                            :src="event.image"
                            alt=""
                            v-if="event.image"
                            class="w-full h-full object-cover absolute top-0 left-0 z-10"
                          />
                        </div>
                      </div>
                      <div class="flex flex-1 gap-6 flex-col" v-else>
                        <div
                          :class="[
                            `bg-${userData.style.backgroundColor.id}-700 text-${userData.style.backgroundColor.id}-500`,
                            userData.style.borderRadius ? 'rounded-xl' : '',
                            'flex grow items-center justify-center text-4xl font-bold uppercase tracking-widest',
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
                      v-if="userData.content.instagram"
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
                          {{ userData.content.instagram }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex gap-4 items-center"
                      v-if="userData.content.twitter"
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
                          {{ userData.content.twitter }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex gap-4 items-center"
                      v-if="userData.content.youtube"
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
                          {{ userData.content.youtube }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex gap-4 items-center"
                      v-if="userData.content.tiktok"
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
                          {{ userData.content.tiktok }}
                        </div>
                      </div>
                    </div>
                    <div
                      :class="[
                        `bg-${userData.style.backgroundColor.id}-50 text-${userData.style.backgroundColor.id}-600`,
                        userData.style.borderRadius ? 'rounded-xl' : '',
                        'flex gap-4 items-center flex-1 py-4 px-4',
                      ]"
                      v-if="userData.content.twitch"
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
                          twitch.tv/{{ userData.content.twitch }}
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
                class="w-1/2 mx-auto"
              />
              <div class="hidden">
                <!-- <div> -->
                <div
                  :class="[
                    `bg-${userData.style.backgroundColor.id}-600 text-${userData.style.backgroundColor.id}-50 bg-pattern-${userData.style.backgroundPattern.id}`,
                    'text-white flex flex-col items-center justify-center h-full w-full p-16 gap-12',
                  ]"
                  ref="portrait"
                  id="portrait"
                  style="width: 1080px; height: 1920px"
                >
                  <div
                    class="text-6xl font-semibold text-center"
                    v-if="!userData.content.titleAuto"
                  >
                    {{ userData.content.title }}
                  </div>
                  <div
                    class="text-6xl font-semibold text-center"
                    v-text="getTitleAuto()"
                    v-else
                  ></div>

                  <div class="flex flex-col h-full w-full gap-4 container">
                    <div
                      class="flex flex-col overflow-hidden min-h-36"
                      :class="[
                        !userData.events.filter((event) => event.day === day.id)
                          .length
                          ? 'basis-1/3'
                          : 'basis-full',
                        userData.content.hideEmpty &&
                        !userData.events.filter((event) => event.day === day.id)
                          .length
                          ? 'hidden'
                          : '',
                      ]"
                      v-for="day in days"
                    >
                      <div class="text-4xl uppercase text-center my-4">
                        {{ day.label }}
                      </div>
                      <div
                        v-if="
                          userData.events.filter(
                            (event) => event.day === day.id
                          ).length
                        "
                        class="flex flex-1 gap-4"
                      >
                        <div
                          v-for="event in userData.events.filter(
                            (event) => event.day === day.id
                          )"
                          :class="[
                            `bg-${userData.style.backgroundColor.id}-700 border-${userData.style.backgroundColor.id}-800`,
                            userData.style.borderRadius ? 'rounded-xl' : '',
                            'flex flex-col grow border-2 text-white items-center justify-end relative overflow-hidden',
                          ]"
                        >
                          <div
                            :class="[
                              `bg-${userData.style.backgroundColor.id}-800 border-${userData.style.backgroundColor.id}-800 text-${userData.style.backgroundColor.id}-50`,
                              userData.style.borderRadius ? 'rounded-t-xl' : '',
                              'relative z-20 py-2 px-4 text-3xl text-center font-semibold tracking-wide border-2 !border-b-0',
                            ]"
                            v-if="event.title"
                          >
                            <span v-if="event.start" class="font-normal">
                              {{ event.start }}
                              <span v-if="event.end">
                                &bull; {{ event.end }}</span
                              >
                              &ndash;
                            </span>
                            {{ event.title }}
                          </div>

                          <img
                            :src="event.image"
                            alt=""
                            v-if="event.image"
                            class="w-full h-full object-cover absolute top-0 left-0 z-10"
                          />
                        </div>
                      </div>
                      <div class="flex flex-1 gap-6 flex-col" v-else>
                        <div
                          :class="[
                            `bg-${userData.style.backgroundColor.id}-700 text-${userData.style.backgroundColor.id}-500`,
                            userData.style.borderRadius ? 'rounded-xl' : '',
                            'flex grow items-center justify-center text-4xl font-bold uppercase tracking-widest',
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
                        `bg-${userData.style.backgroundColor.id}-50 text-${userData.style.backgroundColor.id}-600`,
                        userData.style.borderRadius ? 'rounded-xl' : '',
                        'flex gap-4 items-center flex-1 py-5 px-6',
                      ]"
                      v-if="userData.content.twitch"
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
                          twitch.tv/{{ userData.content.twitch }}
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
  </div>
</template>

<style scoped>
.border-2 {
  border-width: 3px;
}
</style>
