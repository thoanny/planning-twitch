import days from '@/data/days.json';
import { db } from '@/db';
import { useObservable } from '@vueuse/rxjs';
import { liveQuery } from 'dexie';
import { defineStore, storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';
import { useMediasStore } from './medias';

export const useEventsStore = defineStore(
  'events',
  () => {
    const toast = useToast();
    const showTemplates = ref(true);

    const defaultEvent = {
      title: '',
      start: '',
      end: '',
      media: '',
      day: days.find((d) => d.code === 'template').code,
      pos: -1,
    };

    const liveEvents = useObservable(liveQuery(() => db.events.orderBy('pos').toArray()));

    const mediasStore = useMediasStore();
    const { medias } = storeToRefs(mediasStore);

    const events = computed({
      get() {
        console.log('get events');
        return liveEvents.value?.map((event) => ({
          ...event,
          mediaUrl: medias.value?.find((media) => media.id == event.media)?.dataUrl,
        }));
      },
      set(newEvents) {
        newEvents.forEach((nEvent, e) => {
          const originalEvent = events.value.find((oEvent) => oEvent.id == nEvent.id);
          if (originalEvent.pos !== e) {
            db.events.update(nEvent.id, { pos: e });
          }
        });
      },
    });

    const onSaveEvent = async (event) => {
      if (event.id) {
        try {
          delete event.mediaUrl;
          await db.events.update(event.id, { ...event }).then(() => {
            toast.add({
              severity: 'success',
              summary: 'Événement',
              detail: `L'événement "${event.title}" a bien été enregistré.`,
              life: 3000,
            });
          });
        } catch (error) {
          toast.add({
            severity: 'danger',
            summary: 'Événement',
            detail: `Impossible d'enregistrer l'événement "${event.title}" : ${error}.`,
            life: 3000,
          });
        }
      } else {
        try {
          await db.events
            .add({
              title: event.title,
              start: event.start,
              end: event.end,
              media: event.media,
              day: event.day,
              pos: events.value.length,
            })
            .then(() => {
              toast.add({
                severity: 'success',
                summary: 'Événement',
                detail: `L'événement "${event.title}" a bien été ajouté.`,
                life: 3000,
              });
            });
        } catch (error) {
          toast.add({
            severity: 'danger',
            summary: 'Événement',
            detail: `Impossible d'ajouter l'événement "${event.title}" : ${error}.`,
            life: 3000,
          });
        }
      }
    };

    const onDuplicateEvent = async (eventId) => {
      try {
        const event = await db.events.where('id').equals(eventId).first();
        delete event.id;
        await db.events.add({ ...event, pos: events.value.length }).then(() => {
          toast.add({
            severity: 'success',
            summary: 'Événement',
            detail: `L'événement "${event.title}" a bien été dupliqué.`,
            life: 3000,
          });
        });
      } catch (error) {
        toast.add({
          severity: 'danger',
          summary: 'Événement',
          detail: `Impossible de dupliquer l'événement : ${error}.`,
          life: 3000,
        });
      }
    };

    const onDeleteEvent = async (eventId) => {
      try {
        await db.events.delete(eventId).then(() => {
          toast.add({
            severity: 'success',
            summary: 'Événement',
            detail: `L'événement a bien été supprimé.`,
            life: 3000,
          });
        });
      } catch (error) {
        toast.add({
          severity: 'danger',
          summary: 'Événement',
          detail: `Impossible de supprimer l'événement : ${error}.`,
          life: 3000,
        });
      }
    };

    return {
      events,
      showTemplates,
      defaultEvent,
      onSaveEvent,
      onDuplicateEvent,
      onDeleteEvent,
    };
  },
  {
    persist: {
      key: 'events-v2',
      paths: ['showTemplates'],
    },
  },
);
