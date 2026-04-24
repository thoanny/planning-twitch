<script setup>
import SidebarEvents from '@/components/SidebarEvents.vue';
import SidebarSettings from '@/components/SidebarSettings.vue';
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue';
import { inject, ref } from 'vue';
import { version } from '../../package';

const tours = inject('tours');
const activeTab = ref('events');
</script>

<template>
  <div class="lg:max-w-md shrink-0 w-full" id="sidebar">
    <Tabs class="shadow rounded-xl overflow-hidden" data-step="0" v-model:value="activeTab">
      <TabList>
        <Tab value="events">Événements</Tab>
        <Tab value="settings">Paramètres</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="events">
          <SidebarEvents />
        </TabPanel>
        <TabPanel value="settings">
          <SidebarSettings />
        </TabPanel>
      </TabPanels>
    </Tabs>

    <div class="flex justify-center gap-1 mt-4 items-center">
      <Button
        icon="pi pi-question-circle"
        label="Aide"
        size="small"
        link
        @click="
          activeTab = 0;
          tours['myTourDesktop'].start();
        "
        class="hidden! lg:flex!"
      />
      <Button
        icon="pi pi-question-circle"
        label="Aide"
        size="small"
        link
        @click="
          activeTab = 0;
          tours['myTourMobile'].start();
        "
        class="flex! lg:hidden!"
      />
      <a href="https://github.com/thoanny/planning-twitch" target="_blank">
        <Button icon="pi pi-code" label="Source" size="small" link />
      </a>
      <span class="text-sm opacity-50">v{{ version }}</span>
    </div>
  </div>
</template>
