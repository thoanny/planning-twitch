// db.js
import { Dexie } from 'dexie';

export const db = new Dexie('planningTwitch');
db.version(1).stores({
  medias: '++id, name, data',
  events: '++id, title, start, end, media, day, pos',
});
