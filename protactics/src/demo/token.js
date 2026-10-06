// JWT-shaped demo tokens: header.payload.signature, base64url-encoded, so any
// code that decodes the payload (atob on the middle part) keeps working.
// They are NOT secure and never leave the browser.
const SIGNATURE = 'protactics-demo';
const LIFETIME_SECONDS = 30 * 24 * 60 * 60;

const toBase64Url = (text) => {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (value) => {
  let base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  const binary = atob(base64);
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
};

export function signToken({ id, tipo, correo }) {
  const iat = Math.floor(Date.now() / 1000);
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = toBase64Url(JSON.stringify({ id, tipo, correo, iat, exp: iat + LIFETIME_SECONDS }));
  return `${header}.${payload}.${toBase64Url(SIGNATURE)}`;
}

// Returns the payload, or null when the token is malformed, forged or expired.
export function verifyToken(token) {
  try {
    const [header, payload, signature, extra] = String(token).split('.');
    if (!header || !payload || extra !== undefined || fromBase64Url(signature) !== SIGNATURE) return null;
    const data = JSON.parse(fromBase64Url(payload));
    if (!data || typeof data.id !== 'number' || !data.tipo) return null;
    if (data.exp && data.exp * 1000 < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
