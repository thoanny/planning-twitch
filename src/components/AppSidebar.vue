<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

import SidebarEvents from '@/components/SidebarEvents.vue';
import SidebarSettings from '@/components/SidebarSettings.vue';
</script>

<template>
  <div class="lg:max-w-sm shrink-0 w-full" id="sidebar">
    <TabView class="shadow rounded-xl overflow-hidden">
      <TabPanel header="Événements">
        <SidebarEvents />
      </TabPanel>
      <TabPanel header="Paramètres">
        <SidebarSettings />
      </TabPanel>
    </TabView>
    <!-- TODO : ajouter les liens : T-potes, Crédits, Source -->
    <!-- TODO : ajouter un nouveau lien : aide -->
  </div>
</template>

<style scoped></style>
