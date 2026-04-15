import { db } from '@/db';
import { useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { computed, onBeforeUnmount } from 'vue';

export const useMediasStore = defineStore('medias', () => {
  const toast = useToast();
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
