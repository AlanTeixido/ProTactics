// In-browser "database" for the demo, persisted to localStorage.
// It is re-read on every request so several tabs stay in sync.
import { DEMO_STORAGE_PREFIX } from '@/config';
import { scopedStorageKey } from './public';
import { createSeed, SEED_VERSION } from './seed';

const DB_KEY = `${DEMO_STORAGE_PREFIX}db`;

const storageWorks = (() => {
  try {
    const probe = `${DEMO_STORAGE_PREFIX}probe`;
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
})();

// Fallback when localStorage is unavailable (e.g. blocked storage): the demo
// still works, it just forgets everything on reload.
let memoryDb = null;

export const boardStorageKey = (entrenamientoId) => scopedStorageKey(`pizarra-${entrenamientoId}`);

function seed() {
  const { db, boards } = createSeed(new Date());
  try {
    Object.entries(boards).forEach(([id, items]) => {
      localStorage.setItem(boardStorageKey(id), JSON.stringify(items));
    });
  } catch {
    // Boards are optional extras; the rest of the demo still works.
  }
  saveDb(db);
  return db;
}

export function loadDb() {
  if (!storageWorks) return memoryDb || seed();
  try {
    const db = JSON.parse(localStorage.getItem(DB_KEY));
    if (db && db.version === SEED_VERSION) return db;
  } catch {
    // Corrupted or unreadable data: start again from the seed.
  }
  return seed();
}

export function saveDb(db) {
  if (!storageWorks) {
    memoryDb = db;
    return;
  }
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (error) {
    console.warn('[demo] No s\'han pogut desar les dades al navegador:', error);
  }
}

export function removeBoard(entrenamientoId) {
  try {
    localStorage.removeItem(boardStorageKey(entrenamientoId));
  } catch {
    // Nothing stored.
  }
}

// Clubs and coaches share one sequence so /usuarios/:id is never ambiguous.
export function nextId(db, sequence) {
  db.seq[sequence] = (db.seq[sequence] || 0) + 1;
  return db.seq[sequence];
}
