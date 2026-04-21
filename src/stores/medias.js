import { db } from '@/db';
import { useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { defineStore, storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { computed, onBeforeUnmount } from 'vue';
import { useSettingsStore } from './settings';

export const useMediasStore = defineStore('medias', () => {
  const toast = useToast();
  const settingsStore = useSettingsStore();
  const { data: settings } = storeToRefs(settingsStore);
  const liveMedias = useObservable(liveQuery(() => db.medias.toArray()));

  const medias = computed(() => {
    return liveMedias.value?.map((media) => ({
      ...media,
      dataUrl: media.data ? URL.createObjectURL(media.data) : null,
    }));
  });

  const onDeleteMedia = async (mediaId) => {
    try {
      await db.events
        .where('media')
        .equals(mediaId)
        .toArray()
        .then((events) => {
          events.forEach((event) => {
            db.events.update(event.id, { media: '' });
          });
        })
        .then(() => {
          if (settings.value.logoImage == mediaId) {
            settings.value.logoImage = null;
          }
          if (settings.value.landscapeBackgroundImage == mediaId) {
            settings.value.landscapeBackgroundImage = null;
          }
          if (settings.value.portraitBackgroundImage == mediaId) {
            settings.value.portraitBackgroundImage = null;
          }
        })
        .then(async () => {
          await db.medias
            .where('id')
            .equals(mediaId)
            .delete()
            .then(() => {
              toast.add({
                severity: 'success',
                summary: 'Média',
                detail: 'Le média a bien été supprimé.',
                life: 3000,
              });
            });
        });
    } catch (error) {
      toast.add({
        severity: 'danger',
        summary: 'Média',
        detail: `Le média n'a pas été supprimé : ${error}.`,
        life: 3000,
      });
    }
  };

  onBeforeUnmount(() => {
    medias.value.forEach((media) => {
      if (media.dataUrl) {
        URL.revokeObjectURL(media.dataUrl);
      }
    });
  });

  return {
    medias,
    onDeleteMedia,
  };
});
