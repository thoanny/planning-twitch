<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/settings.js';
import { useEventsStore } from '@/stores/events.js';
import domtoimage from 'dom-to-image-more';
import debounce from 'lodash/debounce';
import Image from 'primevue/image';

import IconLink from '@/components/IconLink.vue';
import days from '@/data/days.json';

const landscape = ref();
const imageLandscape = ref();

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);

const eventsStore = useEventsStore();
const { data: events } = storeToRefs(eventsStore);

const eventsByDay = (day) => {
  return events.value.filter((event) => event.day.code === day);
};

const loadLandscapeImage = debounce(() => {
  domtoimage
    .toPng(document.querySelector('#landscape'), {
      width: 1920,
      height: 1080,
      copyDefaultStyles: false,
    })
    .then(function (dataUrl) {
      imageLandscape.value = dataUrl;
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
}, 500);

eventsStore.$subscribe(() => {
  loadLandscapeImage();
});

settingsStore.$subscribe(() => {
  loadLandscapeImage();
});

const handleDownloadImage = () => {
  var link = document.createElement('a');
  link.download = 'planning-paysage.png';
  link.href = imageLandscape.value;
  link.click();
};

loadLandscapeImage();
</script>

<template>
  <div v-if="!imageLandscape" class="flex w-full h-full items-center justify-center">
    Chargement en cours...
  </div>
  <Image
    :src="imageLandscape"
    alt="Image"
    :pt="{ image: { class: 'w-full' } }"
    preview
    @contextmenu.prevent="handleDownloadImage()"
    v-else
  />

  <div class="hidden">
    <div
      :class="[
        `font-${settings.font.code} bg-${settings.color.code}-600 text-${settings.color.code}-50 bg-pattern-${settings.pattern.code}`,
        'text-white flex flex-col items-center justify-center h-full w-full p-8 py-20 gap-12',
      ]"
      ref="landscape"
      id="landscape"
      style="width: 1920px; height: 1080px"
    >
      <div
        class="w-full h-full absolute top-0"
        v-if="settings.pattern.code === 'custom' && settings.background.landscape"
      >
        <img :src="settings.background.landscape" class="object-cover w-full h-full" alt="" />
      </div>
      <div class="text-7xl uppercase text-center relative z-20" v-text="settings.title"></div>
      <div class="flex h-full w-full gap-8 max-w-[1720px] relative z-20">
        <div
          class="flex flex-col overflow-hidden"
          :class="[
            !eventsByDay(day.code).length ? 'basis-1/3' : 'basis-full',
            settings.hideEmpty.landscape && !eventsByDay(day.code).length ? 'hidden' : '',
          ]"
          v-for="day in days.filter((day) => day.code !== 'template')"
          :key="day.code"
        >
          <div class="text-3xl uppercase text-center my-4">
            {{ !eventsByDay(day.code).length ? day.name.slice(0, 3) + '.' : day.name }}
          </div>
          <div v-if="eventsByDay(day.code).length" class="flex flex-1 gap-4 flex-col">
            <div
              v-for="event in eventsByDay(day.code)"
              :key="event.id"
              :class="[
                `bg-${settings.color.code}-700 border-${settings.color.code}-800`,
                settings.rounded ? 'rounded-xl' : '',
                'flex flex-col justify-between grow border-2 text-white items-center justify-center relative overflow-hidden',
              ]"
            >
              <div
                :class="[
                  `bg-${settings.color.code}-800 border-${settings.color.code}-800 text-${settings.color.code}-50`,
                  settings.rounded ? 'rounded-b-xl' : '',
                  'relative z-20 py-2 px-4 text-2xl text-center tracking-wide border-2 !border-t-0',
                ]"
                v-if="event.start"
              >
                {{ event.start }}
                <span v-if="event.end"> &bull; {{ event.end }}</span>
              </div>
              <div v-else></div>
              <div
                :class="[
                  `bg-${settings.color.code}-800 border-${settings.color.code}-800 text-${settings.color.code}-50`,
                  settings.rounded ? 'rounded-t-xl' : '',
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
                `bg-${settings.color.code}-700 text-${settings.color.code}-500`,
                settings.rounded ? 'rounded-xl' : '',
                'flex grow items-center justify-center text-3xl font-bold uppercase tracking-widest',
              ]"
              style="writing-mode: vertical-rl; text-orientation: mixed"
            >
              Hors ligne
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-12 relative z-20">
        <div
          class="flex gap-4 items-center whitespace-nowrap"
          v-for="link in settings.links.filter((l) => l.type && l.value)"
          :class="[
            link.type.code == 'twitch'
              ? `bg-${settings.color.code}-50 text-${settings.color.code}-600 py-4 px-4`
              : '',
            settings.rounded ? 'rounded-xl' : '',
          ]"
        >
          <div class="flex items-center">
            <IconLink :name="link.type.code" />
          </div>
          <div class="tracking-wide" :class="{ uppercase: link.type.code !== 'discord' }">
            <div class="text-xl">
              {{ link.type.code === 'twitch' ? 'Rendez-vous sur' : link.type.name }}
            </div>
            <div class="text-2xl font-semibold">
              {{ link.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
