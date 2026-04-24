<template>
  <div class="card flex justify-content-center">
    <Button @click="visible = true" icon="pi pi-images" label="Médias" />
    <Dialog
      v-model:visible="visible"
      modal
      header="Gestion des médias"
      :style="{ maxWidth: '72rem', width: '100%' }"
    >
      <template #footer>
        <MediaUploader />
      </template>

      <DataView :value="medias" paginator :rows="10">
        <template #list="slotProps">
          <div class="flex flex-col">
            <div
              class="flex gap-4 justify-between items-center border-t first:border-t-0 border-surface-200 py-2"
              v-for="(media, index) in slotProps.items"
              :key="index"
            >
              <div class="flex grow w-full gap-2 items-center">
                <Image
                  :src="media.dataUrl"
                  imageClass="size-12 aspect-square w-full object-cover shrink-0 rounded"
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
          </div>
        </template>
      </DataView>
    </Dialog>
  </div>
</template>

<script setup>
import { useMediasStore } from '@/stores/medias';
import { storeToRefs } from 'pinia';
import { Button, DataView, Dialog, Image } from 'primevue';
import { ref } from 'vue';
import MediaUploader from './MediaUploader.vue';

const mediasStore = useMediasStore();

const { onDeleteMedia } = mediasStore;
const { medias } = storeToRefs(mediasStore);

const visible = ref(false);
</script>
