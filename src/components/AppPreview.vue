<script setup>
import PreviewLandscape from '@/components/PreviewLandscape.vue';
import PreviewPortrait from '@/components/PreviewPortrait.vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
</script>

<template>
  <div class="flex-1">
    <TabView class="shadow rounded-xl overflow-hidden">
      <TabPanel header="Paysage (1920 × 1080 px)">
        <div class="aspect-video w-full h-full bg-pattern-transparent rounded-lg border p-4">
          <PreviewLandscape />
        </div>
      </TabPanel>
      <TabPanel header="Portrait (1080 × 1920 px)">
        <div class="aspect-video w-full h-full bg-pattern-transparent rounded-lg border p-4">
          <PreviewPortrait />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>
