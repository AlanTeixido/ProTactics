import fallbackAvatar from '@/assets/img/usuario.png';
import { API_URL } from '@/config';

export { fallbackAvatar };

// Profile photos can be absolute URLs, data: URLs (demo uploads) or paths
// served by the API. Anything missing falls back to the local avatar.
export function mediaUrl(path) {
  if (!path) return fallbackAvatar;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
