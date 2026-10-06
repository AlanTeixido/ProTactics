import { DEMO_STORAGE_PREFIX } from '@/config';

const storageKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
  return keys.filter(Boolean);
};

// Logs the user out by wiping what the app keeps in localStorage, except the
// demo database, so logging out never throws away a visitor's demo changes.
export function clearSession() {
  try {
    storageKeys()
      .filter((key) => !key.startsWith(DEMO_STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Storage unavailable (private mode, blocked cookies): nothing to clear.
  }
}

// Removes every key owned by the demo (database, saved tactics boards).
export function clearDemoData() {
  try {
    storageKeys()
      .filter((key) => key.startsWith(DEMO_STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Storage unavailable: the demo lives in memory only.
  }
}
