<script setup>
import PreviewLandscape from '@/components/PreviewLandscape.vue';
import PreviewPortrait from '@/components/PreviewPortrait.vue';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue';
</script>

<template>
  <div class="flex-1">
    <h1 class="mt-0 text-primary flex gap-2 items-center text-[2rem] font-bold mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-12 w-12 hidden sm:block"
      >
        <path
          d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        />
        <path
          fill-rule="evenodd"
          d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
          clip-rule="evenodd"
        />
      </svg>

      Générateur de planning
    </h1>
    <Tabs value="landscape" class="shadow rounded-xl overflow-hidden" data-step="4">
      <TabList>
        <Tab value="landscape">Paysage (1920 × 1080 px)</Tab>
        <Tab value="portrait">Portrait (1080 × 1920 px)</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="landscape">
          <div
            class="w-full h-full bg-pattern-transparent rounded-lg border border-surface-300 p-4"
          >
            <PreviewLandscape />
          </div>
        </TabPanel>
        <TabPanel value="portrait">
          <div
            class="w-full h-full bg-pattern-transparent rounded-lg border border-surface-300 p-4 flex justify-center"
          >
            <PreviewPortrait />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
