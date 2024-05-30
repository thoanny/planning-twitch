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

const portrait = ref();
const imagePortrait = ref();

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);

const eventsStore = useEventsStore();
const { data: events } = storeToRefs(eventsStore);

const eventsByDay = (day) => {
  return events.value.filter((event) => event.day.code === day);
};

const loadLandscapeImage = debounce(() => {
  domtoimage
    .toPng(document.querySelector('#portrait'), {
      width: 1080,
      height: 1920,
      copyDefaultStyles: false,
    })
    .then(function (dataUrl) {
      imagePortrait.value = dataUrl;
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
  link.download = 'planning-portrait.png';
  link.href = imagePortrait.value;
  link.click();
};

console.log(eventsByDay('monday'));

loadLandscapeImage();
</script>

<template>
  <Image
    :src="imagePortrait"
    v-if="imagePortrait"
    alt="Image"
    :pt="{
      image: { class: 'w-full object-contain lg:aspect-video block' },
      root: { class: 'block' },
    }"
    preview
    @contextmenu.prevent="handleDownloadImage()"
  />

  <div class="hidden">
    <!-- <div> -->
    <div
      :class="[
        `font-${settings.font.code} bg-${settings.color.code}-600 text-${settings.color.code}-50 bg-pattern-${settings.pattern.code}`,
        'text-white flex flex-col items-center justify-center h-full w-full p-16 pt-[12rem] pb-[9rem] gap-12',
      ]"
      ref="portrait"
      id="portrait"
      style="width: 1080px; height: 1920px"
    >
      <div class="text-5xl font-semibold uppercase text-center" v-text="settings.title"></div>
      <div class="flex flex-col h-full w-full gap-4 container">
        <div
          class="flex flex-col overflow-hidden min-h-36"
          :class="[
            !eventsByDay(day.code).length ? 'basis-1/3' : 'basis-full',
            settings.hideEmpty && !eventsByDay(day.code).length ? 'hidden' : '',
          ]"
          v-for="day in days.filter((d) => d.code !== 'template')"
          :key="day.code"
        >
          <div class="text-4xl uppercase text-center my-4">
            {{ day.name }}
          </div>
          <div v-if="eventsByDay(day.code).length" class="flex flex-1 gap-4">
            <div
              v-for="event in eventsByDay(day.code)"
              :key="event.id"
              :class="[
                `bg-${settings.color.code}-700 border-${settings.color.code}-800`,
                settings.rounded ? 'rounded-xl' : '',
                'flex flex-col w-full border-2 text-white items-center justify-end relative overflow-hidden',
              ]"
            >
              <div
                :class="[
                  `bg-${settings.color.code}-800 border-${settings.color.code}-800 text-${settings.color.code}-50`,
                  settings.rounded ? 'rounded-t-xl' : '',
                  'relative z-20 py-2 px-4 text-3xl text-center font-semibold tracking-wide border-2 !border-b-0',
                ]"
                v-if="event.title"
              >
                <span v-if="event.start" class="font-normal">
                  {{ event.start }}
                  <span v-if="event.end"> &bull; {{ event.end }}</span>
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
                `bg-${settings.color.code}-700 text-${settings.color.code}-500`,
                settings.rounded ? 'rounded-xl' : '',
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
          class="flex gap-4 items-center whitespace-nowrap"
          v-for="link in settings.links.filter((l) => l.type.code === 'twitch' && l.value)"
          :class="[
            link.type.code == 'twitch'
              ? `bg-${settings.color.code}-50 text-${settings.color.code}-600 py-4 px-4`
              : '',
            settings.rounded ? 'rounded-xl' : '',
          ]"
        >
          <div class="flex items-center">
            <IconLink :name="link.type.code" :size="'w-12 h-12'" />
          </div>
          <div class="tracking-wide uppercase flex gap-2 items-center text-3xl">
            <div>Rendez-vous sur</div>
            <div class="font-semibold">
              {{ link.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
