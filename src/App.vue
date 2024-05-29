<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import AppPreview from '@/components/AppPreview.vue';
</script>

<template>
  <div class="container mx-auto h-full">
    <div class="flex flex-col-reverse lg:flex-row gap-4 h-full p-4 mx-auto container">
      <AppSidebar />
      <AppPreview />
    </div>
  </div>
</template>
