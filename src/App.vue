<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import AppPreview from '@/components/AppPreview.vue';
import tourDesktop from '@/data/tour.desktop.json';
import tourMobile from '@/data/tour.mobile.json';
</script>

<template>
  <div class="container mx-auto h-full">
    <div class="flex flex-col-reverse lg:flex-row gap-4 h-full p-4 mx-auto container">
      <AppSidebar />
      <AppPreview />
    </div>
  </div>
  <v-tour
    name="myTourDesktop"
    :steps="tourDesktop"
    :options="{
      highlight: true,
      labels: {
        buttonSkip: 'Passer',
        buttonPrevious: 'Précédent',
        buttonNext: 'Suivant',
        buttonStop: 'Terminer',
      },
    }"
  ></v-tour>
  <v-tour
    name="myTourMobile"
    :steps="tourMobile"
    :options="{
      highlight: true,
      labels: {
        buttonSkip: 'Passer',
        buttonPrevious: 'Précédent',
        buttonNext: 'Suivant',
        buttonStop: 'Terminer',
      },
    }"
  ></v-tour>
</template>
