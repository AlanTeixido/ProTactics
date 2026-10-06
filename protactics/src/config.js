// Single source of truth for the backend location.
//
// Set VITE_API_URL (e.g. in protactics/.env.local) to talk to a real
// ProTactics-API instance. When it is not set, the app runs in demo mode:
// every request is answered in the browser by the mock API in src/demo/.
const configuredUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');

export const DEMO_MODE = configuredUrl === '';

// `.invalid` is a reserved TLD, so nothing can ever leave the browser by mistake
// while the demo adapter is installed.
export const API_URL = configuredUrl || 'https://protactics-api.invalid';

// Every localStorage key owned by the demo starts with this prefix.
export const DEMO_STORAGE_PREFIX = 'protactics-demo:';
