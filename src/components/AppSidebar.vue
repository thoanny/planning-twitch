<script setup>
import { ref, inject } from 'vue';

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Chip from 'primevue/chip';

import SidebarEvents from '@/components/SidebarEvents.vue';
import SidebarSettings from '@/components/SidebarSettings.vue';

const tours = inject('tours');
const activeTab = ref(0);
const visibleThanks = ref(false);
const tpotes = ref(null);

fetch('https://wp.thoanny.fr/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `{
        tPotes(first: 1000, where: {orderby: {field: TITLE, order: ASC}}) {
          nodes {
            featuredImage {
              node {
                sourceUrl(size: THUMBNAIL)
              }
            }
            id
            title(format: RENDERED)
            tPotes {
              source
              startAt
            }
          }
        }
    }`,
  }),
})
  .then((res) => res.json())
  .then((data) => (tpotes.value = data.data.tPotes.nodes));
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
    <div class="flex justify-center gap-1 mt-4">
      <Button
        icon="pi pi-question-circle"
        label="Aide"
        size="small"
        link
        @click="
          activeTab = 0;
          tours['myTour'].start();
        "
      />
      <Button icon="pi pi-heart" label="T-potes" size="small" link @click="visibleThanks = true" />
      <a href="https://github.com/thoanny/planning-twitch" target="_blank">
        <Button icon="pi pi-code" label="Source" size="small" link />
      </a>
    </div>

    <Dialog v-model:visible="visibleThanks" modal header="T-potes" :style="{ width: '35rem' }">
      <div class="mb-4">
        Merci à tous les <strong>T-potes</strong> qui me soutiennent dans mes projets, que ce soit
        sur
        <a
          href="https://twitch.tv/thoanny"
          target="_blank"
          class="font-semibold underline underline-offset-2 text-primary"
          >Twitch</a
        >
        ou
        <a
          href="https://www.patreon.com/thoanny"
          target="_blank"
          class="font-semibold underline underline-offset-2 text-primary"
          >Patreon</a
        >.
      </div>
      <div class="flex flex-wrap gap-2 select-none" v-if="tpotes">
        <Chip
          :label="pote.title"
          :image="pote.featuredImage.node.sourceUrl"
          v-for="pote in tpotes"
        />
      </div>
    </Dialog>
  </div>
</template>
