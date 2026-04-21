<script setup>
import IconLink from '@/components/IconLink.vue';
import days from '@/data/days.json';
import { useEventsStore } from '@/stores/events';
import { useMediasStore } from '@/stores/medias';
import { useSettingsStore } from '@/stores/settings.js';
import { useDebounceFn } from '@vueuse/core';
import domtoimage from 'dom-to-image-more';
import { storeToRefs } from 'pinia';
import Image from 'primevue/image';
import { ref, watch } from 'vue';

const portrait = ref();
const imagePortrait = ref();

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);

const eventsStore = useEventsStore();
const { events } = storeToRefs(eventsStore);

const mediasStore = useMediasStore();
const { medias } = storeToRefs(mediasStore);

const eventsByDay = (day) => {
  return events.value?.filter((event) => event.day === day) || [];
};

const loadPortraitImage = useDebounceFn(() => {
  console.log('loadPortraitImage');
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

const handleDownloadImage = () => {
  var link = document.createElement('a');
  link.download = 'planning-portrait.png';
  link.href = imagePortrait.value;
  link.click();
};

loadPortraitImage();

watch(events, async () => {
  console.log('watcher');
  loadPortraitImage();
});

settingsStore.$subscribe(() => {
  loadPortraitImage();
});

const getMediaUrl = (mediaId) => {
  return medias.value?.find((media) => media.id == mediaId)?.dataUrl;
};
</script>

<template>
  <div v-if="!imagePortrait" class="flex w-full h-full items-center justify-center">
    Chargement en cours...
  </div>
  <Image
    :src="imagePortrait"
    alt="Image"
    :pt="{
      image: { class: 'w-full object-contain block lg:max-h-[75dvh]' },
      root: { class: 'block' },
    }"
    preview
    @contextmenu.prevent="handleDownloadImage()"
    v-else
  />

  <div class="hidden">
    <div
      :class="[
        `font-${settings.fontFamily} bg-pattern-${settings.backgroundPattern}`,
        'relative flex flex-col items-center justify-center h-full w-full px-16 py-20 gap-12',
      ]"
      ref="portrait"
      id="portrait"
      style="width: 1080px; height: 1920px"
      :style="{ backgroundColor: settings.backgroundColor, color: settings.fontColor }"
    >
      <div
        class="w-full h-full absolute top-0"
        v-if="settings.backgroundPattern === 'custom' && settings.portraitBackgroundImage"
      >
        <img
          :src="getMediaUrl(settings.portraitBackgroundImage)"
          class="object-cover w-full h-full"
          alt=""
          v-if="settings.landscapeBackgroundImage"
        />
      </div>
      <div
        class="flex gap-12 justify-between w-full items-center relative z-20"
        :class="{ 'flex-row-reverse': settings.logoAlignment == 'left' }"
      >
        <div
          class="flex-1 font-semibold uppercase leading-tight"
          v-text="settings.title"
          :class="{
            'text-left': settings.logoImage && settings.logoAlignment == 'right',
            'text-center': !settings.logoImage,
            'text-right': settings.logoImage && settings.logoAlignment == 'left',
          }"
          :style="{ fontSize: `${settings.headingFontSizePortrait}px` }"
        ></div>
        <div v-if="settings.logoImage">
          <img :src="getMediaUrl(settings.logoImage)" class="max-h-40 w-full" alt="" />
        </div>
      </div>

      <div class="flex flex-col h-full w-full gap-6 container relative z-20">
        <div
          class="flex flex-col overflow-hidden min-h-36"
          :class="[
            !eventsByDay(day.code).length ? 'basis-1/3' : 'basis-full',
            settings.hideEmptyPortrait && !eventsByDay(day.code).length ? 'hidden' : '',
          ]"
          v-for="day in days.filter((day) => day.code !== 'template')"
          :key="day.code"
        >
          <div
            class="text-4xl uppercase text-center mb-4 font-bold"
            v-if="eventsByDay(day.code).length > 0"
          >
            {{ day.name }}
          </div>
          <div v-if="eventsByDay(day.code).length" class="flex flex-1 gap-4">
            <div
              v-for="event in eventsByDay(day.code)"
              :key="event.id"
              class="flex flex-col w-full border-3 text-white items-center justify-end relative overflow-hidden"
              :style="{
                backgroundColor: settings.eventBackgroundSecondaryColor,
                borderColor: settings.eventBackgroundPrimaryColor,
                borderRadius: `${settings.borderRadius}px`,
              }"
            >
              <div
                class="relative z-20 py-2 px-4 text-center font-semibold tracking-wide border-2 !border-b-0"
                :style="{
                  color: settings.eventFontColor,
                  fontSize: `${settings.eventFontSizePortrait}px`,
                  backgroundColor: settings.eventBackgroundPrimaryColor,
                  borderColor: settings.eventBackgroundPrimaryColor,
                  borderTopLeftRadius: `${settings.borderRadius / 2}px`,
                  borderTopRightRadius: `${settings.borderRadius / 2}px`,
                }"
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
                :src="event.mediaUrl"
                :alt="event.title"
                v-if="event.media"
                @error="handleEventImageError"
                class="w-full h-full object-cover absolute top-0 left-0 z-10"
              />
            </div>
          </div>
          <div class="flex flex-1 gap-6 flex-col" v-else>
            <div
              class="flex grow items-center justify-between text-3xl font-bold uppercase tracking-widest px-12"
              :style="{
                color: settings.eventFontColor,
                backgroundColor: settings.eventBackgroundSecondaryColor,
                borderRadius: `${settings.borderRadius}px`,
              }"
            >
              <span>{{ day.name }}</span>
              <span>Hors ligne</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-6 relative z-20">
        <div
          class="flex gap-4 items-center whitespace-nowrap py-4 px-4"
          v-for="link in settings.links.filter((l) => l.type == 'twitch' && l.value)"
          :style="{
            borderRadius: `${settings.borderRadius}px`,
            backgroundColor: settings.linkBackgroundColor,
            color: settings.linkFontColor,
          }"
        >
          <div class="flex items-center">
            <IconLink
              :name="link.type"
              :size="'w-12 h-12'"
              :style="{
                color: settings.linkIconColor,
              }"
            />
          </div>
          <div class="tracking-wide uppercase flex gap-2 items-center text-3xl">
            <div>Rendez-vous sur</div>
            <div class="font-semibold">
              {{ link.type === 'twitch' ? 'twitch.tv/' : '' }}{{ link.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
