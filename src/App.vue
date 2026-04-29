<script setup>
import AppPreview from '@/components/AppPreview.vue';
import AppSidebar from '@/components/AppSidebar.vue';

import Toast from 'primevue/toast';
</script>

<template>
  <div class="container mx-auto h-full">
    <div class="flex flex-col-reverse lg:flex-row gap-4 h-full p-4">
      <AppSidebar />
      <AppPreview />
      <Toast position="bottom-right" :life="3000" />
    </div>
  </div>
</template>
