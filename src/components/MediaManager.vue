<template>
  <div class="card flex justify-content-center">
    <Button label="Médias" @click="visible = true" size="small" icon="pi pi-images" />
    <Dialog
      v-model:visible="visible"
      modal
      header="Gestion des médias"
      :style="{ maxWidth: '90dvw', width: '100%' }"
    >
      <template #footer>
        <MediaUploader />
      </template>
      <div class="flex flex-col gap-2" v-if="medias.length > 0">
        <Card
          class="border shadow-none w-full"
          :pt="{ body: { class: 'p-2 gap-2' } }"
          v-for="media in medias"
          :key="media.id"
        >
          <template #content>
            <div class="flex gap-4 justify-between items-center">
              <div class="flex grow w-full gap-2 items-center">
                <Image
                  :src="media.dataUrl"
                  imageClass="size-12 aspect-square w-full object-cover shrink-0"
                  preview
                />
                <div class="truncate hidden sm:block w-full" style="max-width: calc(100% - 4rem)">
                  {{ media.name }}
                </div>
              </div>
              <div>
                <Button
                  label="Supprimer"
                  severity="danger"
                  size="small"
                  text
                  @click="onDeleteMedia(media.id)"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div v-else>
        <span class="opacity-50"
          >Aucun média disponible. Ajoutez des médias pour les utiliser ultérieurement.</span
        >
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { useMediasStore } from '@/stores/medias';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Image from 'primevue/image';
import { ref } from 'vue';
import MediaUploader from './MediaUploader.vue';

const mediasStore = useMediasStore();

const { onDeleteMedia } = mediasStore;
const { medias } = storeToRefs(mediasStore);

const visible = ref(false);
</script>
