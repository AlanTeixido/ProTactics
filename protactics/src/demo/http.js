// Small HTTP vocabulary shared by the demo route handlers.
import { verifyToken } from './token';

export class HttpError extends Error {
  constructor(status, error) {
    super(error);
    this.status = status;
    this.body = { error };
  }
}

export const fail = (status, error) => {
  throw new HttpError(status, error);
};

export const ok = (data) => ({ status: 200, data });
export const created = (data) => ({ status: 201, data });

export const nowIso = () => new Date().toISOString();

export const toId = (value) => {
  const id = Number.parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
};

// Express parses `null`/'' fields straight into SQL; keep numbers as numbers.
export const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
};

export const isBlank = (value) => value === undefined || value === null || String(value).trim() === '';

export const sameEmail = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();

export const isFile = (value) => typeof Blob !== 'undefined' && value instanceof Blob;

export const fileToDataUrl = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(blob);
});

// Photo fields may arrive as a URL string or, from a multipart form, as a file.
// Files are stored as data URLs and that data URL is what the API returns.
export async function readPhoto(body, field = 'foto_url') {
  const file = [body.foto, body.imagen, body[field]].find(isFile);
  if (file) return fileToDataUrl(file);
  return field in body ? body[field] || null : undefined;
}

// Mirrors ProTactics-API/middleware/authMiddleware.js.
export function authenticate(headers, db) {
  const header = headers.get('Authorization');
  if (!header) fail(401, 'Falta el token');

  const token = String(header).split(' ')[1];
  if (!token) fail(401, 'Token no proporcionat');

  const payload = verifyToken(token);
  if (!payload) fail(403, 'Token invàlid o caducat');

  const user = { id: payload.id, tipo: payload.tipo, correo: payload.correo };
  if (user.tipo === 'entrenador') {
    const coach = db.entrenadores.find((e) => e.entrenador_id === user.id);
    if (coach) user.club_id = coach.club_id;
  }
  return user;
}

// Same as authenticate() but never throws: for public routes that personalise
// their response when a valid token is present.
export function optionalUser(headers, db) {
  try {
    return authenticate(headers, db);
  } catch {
    return null;
  }
}

// Club a user belongs to (the club itself, or the coach's club).
export const clubIdOf = (user) => (user.tipo === 'club' ? user.id : user.club_id ?? null);

export const byNewest = (a, b) => new Date(b.creado_en) - new Date(a.creado_en);
