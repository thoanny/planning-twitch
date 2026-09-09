<template>
  <div class="card flex justify-content-center">
    <Button @click="visible = true">
      <Images />
      Médias
    </Button>
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
                <img
                  :src="media.dataUrl"
                  class="size-12 aspect-square object-cover shrink-0 rounded cursor-pointer"
                  @click="
                    () => {
                      selectedImageGallery = media;
                      galleryOpen = true;
                    }
                  "
                />
                <div class="truncate hidden sm:block w-full" style="max-width: calc(100% - 4rem)">
                  {{ media.name }}
                </div>
              </div>
              <div>
                <Button severity="danger" size="small" text @click="onDeleteMedia(media.id)">
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </Dialog>

    <Gallery v-if="galleryOpen" fullscreen @update:fullscreen="galleryOpen = $event">
      <GalleryBackdrop />
      <GalleryHeader class="justify-end gap-2">
        <Button
          severity="danger"
          iconOnly
          rounded
          @click="
            () => {
              galleryOpen = false;
              onDeleteMedia(selectedImageGallery.id);
            }
          "
          class="mr-4"
        >
          <Trash />
        </Button>
        <GalleryZoomIn>
          <SearchPlus />
        </GalleryZoomIn>
        <GalleryZoomOut>
          <SearchMinus />
        </GalleryZoomOut>
        <button class="p-gallery-action" @click="galleryOpen = false">
          <Times />
        </button>
      </GalleryHeader>
      <GalleryContent>
        <GalleryItem>
          <img :src="selectedImageGallery.dataUrl" alt="image" />
        </GalleryItem>
      </GalleryContent>
    </Gallery>
  </div>
</template>

<script setup>
import MediaUploader from '@/components/MediaUploader.vue';
import { useMediasStore } from '@/stores/medias';
import { Images, SearchMinus, SearchPlus, Times, Trash } from '@primeicons/vue';
import { storeToRefs } from 'pinia';
import {
  Button,
  DataView,
  Dialog,
  Gallery,
  GalleryBackdrop,
  GalleryContent,
  GalleryHeader,
  GalleryItem,
  GalleryZoomIn,
  GalleryZoomOut,
} from 'primevue';
import { ref } from 'vue';

const mediasStore = useMediasStore();

const { onDeleteMedia } = mediasStore;
const { medias } = storeToRefs(mediasStore);

const visible = ref(false);
const selectedImageGallery = ref('');
const galleryOpen = ref(false);
</script>
