// Demo mode: answers every API call in the browser (see src/config.js).
import { createDemoAdapter } from './adapter';
import { loadDb } from './db';

export function installDemoApi(axios) {
  // Seeds the database (and the saved tactics boards) on the first visit.
  loadDb();
  axios.defaults.adapter = createDemoAdapter();
  console.info('[demo] ProTactics funciona en mode demo: les dades es guarden al teu navegador (localStorage, prefix "protactics-demo:").');
}
