// /publicaciones (+ likes), and the /posts and /seguimientos endpoints used by
// PostsDashboard.vue, which the real API never implemented.
import { nextId } from '../db';
import {
  fail, ok, created, nowIso, toId, toNumberOrNull, isBlank, byNewest,
} from '../http';
import { toInterval } from './entrenamientos';

const likeCount = (db, id) => db.likes.filter((l) => l.publicacion_id === id).length;
const likedBy = (db, id, userId) => userId != null && db.likes.some((l) => l.publicacion_id === id && l.entrenador_id === userId);

// Real API: SELECT p.*, e.nombre AS entrenador ... JOIN entrenadores (club coaches
// only). The like fields are extra so the UI can show them.
function decorate(db, user) {
  return (pub) => {
    const coach = db.entrenadores.find((e) => e.entrenador_id === pub.entrenador_id);
    if (!coach || coach.club_id == null) return null;
    return {
      ...pub,
      entrenador: coach.nombre,
      likes: likeCount(db, pub.publicacion_id),
      liked: user?.tipo === 'entrenador' && likedBy(db, pub.publicacion_id, user.id),
    };
  };
}

function listPublications({ db, optionalUser }) {
  return ok(db.publicaciones.slice().sort(byNewest).map(decorate(db, optionalUser())).filter(Boolean));
}

function getPublication({ params, db, optionalUser }) {
  const pub = db.publicaciones.find((p) => p.publicacion_id === toId(params.id));
  const result = pub && decorate(db, optionalUser())(pub);
  if (!result) fail(404, 'Publicación no encontrada.');
  return ok(result);
}

const requireClubCoach = (user, error) => {
  if (user.tipo !== 'entrenador' || user.club_id == null) fail(403, error);
  return user;
};

function insertPublication(db, user, fields) {
  const pub = {
    publicacion_id: nextId(db, 'publicacion'),
    entrenador_id: user.id,
    entrenamiento_id: toId(fields.entrenamiento_id),
    titulo: String(fields.titulo).trim(),
    contenido: fields.contenido ?? '',
    imagen_url: fields.imagen_url || 'default.png',
    categoria: fields.categoria ?? null,
    campo: fields.campo ?? null,
    fecha_entrenamiento: fields.fecha_entrenamiento ?? null,
    duracion_repeticion: fields.duracion_repeticion ?? null,
    repeticiones: toNumberOrNull(fields.repeticiones),
    total_duracion: fields.total_duracion ?? null,
    descanso: toNumberOrNull(fields.descanso),
    notas_adicionales: fields.notas_adicionales ?? null,
    creado_en: nowIso(),
  };
  db.publicaciones.push(pub);
  return pub;
}

function createPublication({ body, db, auth, changed }) {
  const user = requireClubCoach(auth(), 'Solo los entrenadores de club pueden publicar.');
  if (isBlank(body.titulo) || isBlank(body.contenido)) fail(400, 'Título y contenido son obligatorios.');
  const pub = insertPublication(db, user, body);
  changed();
  return created(pub);
}

// Total session time = reps x duration + rests between reps.
function totalDuration(body) {
  const each = toInterval(body.duracion_repeticion)?.minutes;
  const reps = toNumberOrNull(body.repeticiones);
  if (!each || !reps) return null;
  const total = each * reps + (toNumberOrNull(body.descanso) || 0) * (reps - 1);
  const interval = {};
  if (total >= 60) interval.hours = Math.floor(total / 60);
  if (total % 60) interval.minutes = total % 60;
  return interval;
}

// The real endpoint also requires `contenido` and `fecha_entrenamiento`, which
// made sessions without a description or date impossible to share; the demo
// only requires what identifies the session.
function publishTraining({ body, db, auth, changed }) {
  const user = requireClubCoach(auth(), 'Solo los entrenadores de club pueden publicar.');
  if (isBlank(body.titulo) || isBlank(body.entrenamiento_id)) fail(400, 'Faltan datos obligatorios.');
  const training = db.entrenamientos.find((t) => t.entrenamiento_id === toId(body.entrenamiento_id) && t.entrenador_id === user.id);
  if (!training) fail(404, 'Entrenamiento no encontrado.');
  const pub = insertPublication(db, user, {
    ...body,
    duracion_repeticion: toInterval(body.duracion_repeticion),
    total_duracion: body.total_duracion || totalDuration(body),
  });
  changed();
  return created(pub);
}

function deletePublication({ params, db, auth, changed }) {
  const user = requireClubCoach(auth(), 'Solo los entrenadores de club pueden eliminar publicaciones.');
  const pub = db.publicaciones.find((p) => p.publicacion_id === toId(params.id) && p.entrenador_id === user.id);
  if (pub) {
    db.publicaciones = db.publicaciones.filter((p) => p !== pub);
    db.likes = db.likes.filter((l) => l.publicacion_id !== pub.publicacion_id);
    changed();
  }
  return ok({ mensaje: 'Publicación eliminada correctamente.' });
}

function setLike(db, publicacionId, entrenadorId, value) {
  if (!db.publicaciones.some((p) => p.publicacion_id === publicacionId)) fail(404, 'Publicación no encontrada.');
  db.likes = db.likes.filter((l) => !(l.publicacion_id === publicacionId && l.entrenador_id === entrenadorId));
  if (value) db.likes.push({ publicacion_id: publicacionId, entrenador_id: entrenadorId });
}

function like({ params, db, auth, changed }) {
  const user = requireClubCoach(auth(), 'Solo los entrenadores de club pueden dar like.');
  setLike(db, toId(params.id), user.id, true);
  changed();
  return ok({ mensaje: 'Like añadido.', likes: likeCount(db, toId(params.id)) });
}

function unlike({ params, db, auth, changed }) {
  const user = requireClubCoach(auth(), 'Solo los entrenadores de club pueden quitar like.');
  setLike(db, toId(params.id), user.id, false);
  changed();
  return ok({ mensaje: 'Like eliminado.', likes: likeCount(db, toId(params.id)) });
}

// ---- /posts and /seguimientos (PostsDashboard.vue) -------------------------------
// That component sends no token, only the user id in the body, so these
// endpoints identify the user from the token when present, else from the body.

const actorId = (ctx, field) => ctx.optionalUser()?.id ?? toId(ctx.body[field] ?? ctx.query[field]);

function listPosts(ctx) {
  const { db } = ctx;
  const userId = actorId(ctx, 'usuario_id');
  return ok(db.publicaciones.slice().sort(byNewest).map((p) => {
    const coach = db.entrenadores.find((e) => e.entrenador_id === p.entrenador_id);
    return {
      id: p.publicacion_id,
      usuario_id: p.entrenador_id,
      nombre_usuario: coach?.nombre ?? null,
      image_url: null,
      contingut: p.contenido,
      likes_count: likeCount(db, p.publicacion_id),
      liked_by_user: likedBy(db, p.publicacion_id, userId),
    };
  }));
}

function postLike(value) {
  return (ctx) => {
    const userId = actorId(ctx, 'usuario_id');
    if (userId == null) fail(401, 'Falta el token');
    setLike(ctx.db, toId(ctx.params.id), userId, value);
    ctx.changed();
    return ok({ mensaje: value ? 'Like añadido.' : 'Like eliminado.' });
  };
}

function followed({ params, db }) {
  const id = toId(params.id);
  return ok(db.seguimientos
    .filter((s) => s.seguidor_id === id)
    .map((s) => db.entrenadores.find((e) => e.entrenador_id === s.seguido_id))
    .filter(Boolean)
    .map((e) => ({ id: e.entrenador_id, nombre: e.nombre, foto_url: e.foto_url })));
}

function follow(value) {
  return (ctx) => {
    const seguidor = actorId(ctx, 'seguidor_id');
    const seguido = toId(ctx.params.id);
    if (seguidor == null) fail(401, 'Falta el token');
    if (seguido == null || seguido === seguidor) fail(400, 'Usuari no vàlid.');
    const { db } = ctx;
    db.seguimientos = db.seguimientos.filter((s) => !(s.seguidor_id === seguidor && s.seguido_id === seguido));
    if (value) db.seguimientos.push({ seguidor_id: seguidor, seguido_id: seguido });
    ctx.changed();
    return value ? created({ mensaje: 'Ara segueixes aquest usuari.' }) : ok({ mensaje: 'Has deixat de seguir aquest usuari.' });
  };
}

export default [
  ['GET', '/publicaciones', listPublications],
  ['POST', '/publicaciones', createPublication],
  ['POST', '/publicaciones/desde-entrenamiento', publishTraining],
  ['GET', '/publicaciones/:id', getPublication],
  ['DELETE', '/publicaciones/:id', deletePublication],
  ['POST', '/publicaciones/:id/like', like],
  ['DELETE', '/publicaciones/:id/like', unlike],

  ['GET', '/posts', listPosts],
  ['POST', '/posts/:id/like', postLike(true)],
  ['DELETE', '/posts/:id/like', postLike(false)],
  ['GET', '/seguimientos/:id/seguidos', followed],
  ['POST', '/seguimientos/:id/seguir', follow(true)],
  ['DELETE', '/seguimientos/:id/dejar-seguir', follow(false)],
];
