<script setup>
import IconLink from '@/components/IconLink.vue';
import days from '@/data/days.json';
import socials from '@/data/socials.json';
import { useEventsStore } from '@/stores/events';
import { useMediasStore } from '@/stores/medias';
import { useSettingsStore } from '@/stores/settings.js';
import { useDebounceFn } from '@vueuse/core';
import domtoimage from 'dom-to-image-more';
import { storeToRefs } from 'pinia';
import { Image } from 'primevue';
import { ref, watch } from 'vue';

const landscape = ref();
const imageLandscape = ref();

const settingsStore = useSettingsStore();
const { data: settings } = storeToRefs(settingsStore);

const eventsStore = useEventsStore();
const { events } = storeToRefs(eventsStore);

const mediasStore = useMediasStore();
const { medias } = storeToRefs(mediasStore);

const eventsByDay = (day) => {
  return events.value?.filter((event) => event.day === day) || [];
};

const loadLandscapeImage = useDebounceFn(() => {
  console.log('loadLandscapeImage');
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

const handleDownloadImage = () => {
  var link = document.createElement('a');
  link.download = 'planning-paysage.png';
  link.href = imageLandscape.value;
  link.click();
};

loadLandscapeImage();

watch(events, async () => {
  console.log('watcher');
  loadLandscapeImage();
});

settingsStore.$subscribe(() => {
  loadLandscapeImage();
});

const getMediaUrl = (mediaId) => {
  return medias.value?.find((media) => media.id == mediaId)?.dataUrl;
};
</script>

<template>
  <div v-if="!imageLandscape" class="flex w-full h-full items-center justify-center aspect-video">
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
        `font-${settings.fontFamily} bg-pattern-${settings.backgroundPattern}`,
        'flex flex-col items-center justify-center h-full w-full px-8 py-20 gap-12',
      ]"
      ref="landscape"
      id="landscape"
      style="width: 1920px; height: 1080px"
      :style="{ backgroundColor: settings.backgroundColor, color: settings.fontColor }"
    >
      <div
        class="w-full h-full absolute top-0"
        v-if="settings.backgroundPattern === 'custom' && settings.landscapeBackgroundImage"
      >
        <img
          :src="getMediaUrl(settings.landscapeBackgroundImage)"
          class="object-cover w-full h-full"
          alt=""
          v-if="settings.landscapeBackgroundImage"
        />
      </div>
      <div
        class="flex gap-12 justify-between w-full items-center relative z-20 max-w-[1720px]"
        :class="{ 'flex-row-reverse': settings.logoAlignment == 'left' }"
      >
        <div
          class="flex-1 uppercase leading-tight font-bold"
          v-text="settings.title"
          :class="{
            'text-left': settings.logoImage && settings.logoAlignment == 'right',
            'text-center': !settings.logoImage,
            'text-right': settings.logoImage && settings.logoAlignment == 'left',
          }"
          :style="{ fontSize: `${settings.headingFontSizeLandscape}px` }"
        ></div>
        <div v-if="settings.logoImage">
          <img :src="getMediaUrl(settings.logoImage)" class="max-h-44 w-full" alt="" />
        </div>
      </div>
      <div class="flex h-full w-full gap-8 max-w-[1720px] relative z-20">
        <div
          class="flex flex-col overflow-hidden"
          :class="[
            !eventsByDay(day.code).length ? 'basis-1/3' : 'basis-full',
            settings.hideEmptyLandscape && !eventsByDay(day.code).length ? 'hidden' : '',
          ]"
          v-for="day in days.filter((day) => day.code !== 'template')"
          :key="day.code"
        >
          <div class="text-3xl uppercase text-center my-4 font-bold">
            {{ !eventsByDay(day.code).length ? day.name.slice(0, 3) + '.' : day.name }}
          </div>
          <div v-if="eventsByDay(day.code).length" class="flex flex-1 gap-4 flex-col">
            <div
              v-for="event in eventsByDay(day.code)"
              :key="event.id"
              class="flex flex-col justify-between grow border-3 items-center relative overflow-hidden"
              :style="{
                backgroundColor: settings.eventBackgroundSecondaryColor,
                borderColor: settings.eventBackgroundPrimaryColor,
                borderRadius: `${settings.borderRadius}px`,
              }"
            >
              <div
                class="relative z-20 py-2 px-4 text-2xl text-center tracking-wide border-2 !border-t-0 font-semibold"
                :style="{
                  color: settings.eventFontColor,
                  fontSize: `${settings.eventFontSizeLandscape}px`,
                  backgroundColor: settings.eventBackgroundPrimaryColor,
                  borderColor: settings.eventBackgroundPrimaryColor,
                  borderBottomLeftRadius: `${settings.borderRadius / 2}px`,
                  borderBottomRightRadius: `${settings.borderRadius / 2}px`,
                }"
                v-if="event.start"
              >
                {{ event.start }}
                <span v-if="event.end"> &bull; {{ event.end }}</span>
              </div>
              <div v-else></div>
              <div
                class="relative z-20 py-2 px-4 text-center font-bold tracking-wide border-2 !border-b-0"
                :style="{
                  color: settings.eventFontColor,
                  fontSize: `${settings.eventFontSizeLandscape}px`,
                  backgroundColor: settings.eventBackgroundPrimaryColor,
                  borderColor: settings.eventBackgroundPrimaryColor,
                  borderTopLeftRadius: `${settings.borderRadius / 2}px`,
                  borderTopRightRadius: `${settings.borderRadius / 2}px`,
                }"
                v-if="event.title"
              >
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
              class="flex grow items-center justify-center text-3xl font-bold uppercase tracking-widest"
              style="writing-mode: vertical-rl; text-orientation: mixed"
              :style="{
                color: settings.eventFontColor,
                backgroundColor: settings.eventBackgroundSecondaryColor,
                borderRadius: `${settings.borderRadius}px`,
              }"
            >
              <span>Hors ligne</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-8 relative z-20">
        <div
          class="flex gap-4 items-center whitespace-nowrap py-4 px-4"
          v-for="link in settings.links.filter((l) => l.type && l.value)"
          :style="{
            borderRadius: `${settings.borderRadius}px`,
            backgroundColor: settings.linkBackgroundColor,
            color: settings.linkFontColor,
          }"
        >
          <div class="flex items-center">
            <IconLink
              :name="link.type"
              :style="{
                color: settings.linkIconColor,
              }"
            />
          </div>
          <div class="tracking-wide" :class="{ uppercase: link.type !== 'discord' }">
            <div class="text-xl font-semibold">
              {{
                link.type === 'twitch'
                  ? 'Rendez-vous sur'
                  : socials.find((s) => s.code == link.type)?.name
              }}
            </div>
            <div class="text-2xl font-bold">
              {{ link.type === 'twitch' ? 'twitch.tv/' : '' }}{{ link.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
