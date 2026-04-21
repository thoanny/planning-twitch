<script setup>
import SidebarEvents from '@/components/SidebarEvents.vue';
import SidebarSettings from '@/components/SidebarSettings.vue';
import Button from 'primevue/button';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import { inject, ref } from 'vue';

const tours = inject('tours');
const activeTab = ref(0);
</script>

<template>
  <div class="lg:max-w-md shrink-0 w-full" id="sidebar">
    <TabView
      class="shadow rounded-xl overflow-hidden"
      data-step="0"
      v-model:activeIndex="activeTab"
    >
      <TabPanel header="Événements">
        <SidebarEvents />
      </TabPanel>
      <TabPanel header="Paramètres">
        <SidebarSettings />
      </TabPanel>
    </TabView>
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
        class="hidden lg:flex"
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
        class="flex lg:hidden"
      />
      <a href="https://github.com/thoanny/planning-twitch" target="_blank">
        <Button icon="pi pi-code" label="Source" size="small" link />
      </a>
      <span class="text-sm opacity-50">v2.0</span>
    </div>
  </div>
</template>
