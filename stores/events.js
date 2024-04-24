import { v4 as uuidv4 } from "uuid";
import days from "~/data/days.json";

export const useEventsStore = defineStore("events", () => {
  const modalOpen = ref(false);
  const data = ref([]);

  const findByDay = (day) => {
    return data.value.filter((event) => event.day === day);
  };

  const editedEvent = reactive({
    type: null,
    day: days[0],
    event: {
      uid: null,
      title: "",
      color: "",
      image: "",
      start: "",
      end: "",
      day: null,
    },
  });

  const handleEditEvent = (uid = null) => {
    if (uid) {
      const event = data.value.find((event) => event.uid === uid);
      editedEvent.type = "edit";
      editedEvent.event = event;
      editedEvent.day = days[event.day];
    } else {
      editedEvent.type = "new";
      editedEvent.event = {
        uid: null,
        title: "",
        color: "",
        image: "",
        start: "",
        end: "",
        day: null,
      };
      editedEvent.day = days[0];
    }
    modalOpen.value = true;
  };

  const handleSaveEvent = () => {
    if (editedEvent.type === "new") {
      editedEvent.event.day = editedEvent.day.id;
      editedEvent.event.uid = uuidv4();
      data.value.push(editedEvent.event);
    }

    modalOpen.value = false;
  };

  const handleDeleteEvent = (uid) => {
    const eventIdx = data.value.findIndex((event) => event.uid === uid);
    if (eventIdx > -1) {
      data.value.splice(eventIdx, 1);
    }
  };

  return {
    data,
    findByDay,
    modalOpen,
    handleEditEvent,
    handleSaveEvent,
    handleDeleteEvent,
    editedEvent,
  };
});
