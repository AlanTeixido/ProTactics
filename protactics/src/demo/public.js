// Lightweight helpers that components can import without pulling in the whole
// mock API (which is loaded lazily from main.js only in demo mode).
import { DEMO_MODE, DEMO_STORAGE_PREFIX } from '@/config';
import { clearDemoData, clearSession } from '@/session';

// Accounts the "Entrar com a ... (demo)" buttons log into. The id is what
// matters: it keeps working even if the visitor edits the account's e-mail.
export const DEMO_ACCOUNTS = {
  club: { id: 4, correo: 'secretaria@cema.example' },
  entrenador: { id: 11, correo: 'jpuigvert@cema.example' },
};

// In demo mode, browser-only data (tactics boards) is namespaced with the demo
// prefix so it survives logout and is wiped by "Restablir demo".
export const scopedStorageKey = (name) => (DEMO_MODE ? `${DEMO_STORAGE_PREFIX}${name}` : name);

export function resetDemo() {
  clearDemoData();
  clearSession();
  window.location.assign(`${import.meta.env.BASE_URL}login`);
}
