// /entrenamientos. Mirrors ProTactics-API entrenamientoController.js: every
// training session belongs to the coach who created it.
import { nextId, removeBoard } from '../db';
import {
  fail, ok, created, nowIso, toId, toNumberOrNull, byNewest, clubIdOf,
} from '../http';
import { findCoachFor } from './cuentas';

const TEXT_FIELDS = ['titulo', 'descripcion', 'categoria', 'campo', 'fecha_entrenamiento', 'imagen_url', 'notas'];
const NUMBER_FIELDS = ['repeticiones', 'descanso', 'valoracion'];

// node-postgres returns INTERVAL columns as objects such as { minutes: 18 };
// the frontend sends either that shape or a plain number of minutes.
export function toInterval(value) {
  if (value && typeof value === 'object') {
    const minutes = (Number(value.hours) || 0) * 60 + (Number(value.minutes) || 0);
    return minutes ? { minutes } : null;
  }
  const minutes = Number.parseInt(value, 10);
  return Number.isNaN(minutes) || minutes <= 0 ? null : { minutes };
}

function applyFields(target, body) {
  TEXT_FIELDS.forEach((key) => {
    if (key in body) target[key] = body[key] === '' ? null : body[key] ?? null;
  });
  NUMBER_FIELDS.forEach((key) => {
    if (key in body) target[key] = toNumberOrNull(body[key]);
  });
  if ('duracion_repeticion' in body) target.duracion_repeticion = toInterval(body.duracion_repeticion);
}

function createTraining({ body, db, auth, changed }) {
  const user = auth();
  if (user.tipo !== 'entrenador') fail(403, 'Només els entrenadors poden crear entrenaments.');
  const entrenamiento = { entrenamiento_id: nextId(db, 'entrenamiento'), entrenador_id: user.id };
  applyFields(entrenamiento, body);
  entrenamiento.jugadores = Array.isArray(body.jugadores) ? body.jugadores.map(toId).filter((id) => id !== null) : [];
  entrenamiento.creado_en = nowIso();
  db.entrenamientos.push(entrenamiento);
  changed();
  return created({ message: 'Entrenamiento creado', entrenamiento });
}

function trainingsOf(db, user) {
  if (user.tipo === 'club') {
    const coaches = new Set(db.entrenadores.filter((e) => e.club_id === clubIdOf(user)).map((e) => e.entrenador_id));
    return db.entrenamientos.filter((t) => coaches.has(t.entrenador_id));
  }
  return db.entrenamientos.filter((t) => t.entrenador_id === user.id);
}

function listTrainings({ db, auth }) {
  return ok(trainingsOf(db, auth()).sort(byNewest));
}

// Not in the real API (the legacy EditarEntrenamiento view used it).
function listTrainingsOfCoach({ params, db, auth }) {
  const coach = findCoachFor(db, auth(), params.id);
  if (!coach) return ok([]);
  return ok(db.entrenamientos.filter((t) => t.entrenador_id === coach.entrenador_id).sort(byNewest));
}

const ownTraining = (db, user, id) => {
  const training = db.entrenamientos.find((t) => t.entrenamiento_id === toId(id) && t.entrenador_id === user.id);
  if (!training) fail(404, 'Entrenamiento no encontrado.');
  return training;
};

function updateTraining({ params, body, db, auth, changed }) {
  const training = ownTraining(db, auth(), params.id);
  applyFields(training, body);
  if (Array.isArray(body.jugadores)) training.jugadores = body.jugadores.map(toId).filter((id) => id !== null);
  changed();
  return ok({ message: 'Entrenamiento actualizado correctamente' });
}

function deleteTraining({ params, db, auth, changed }) {
  const training = ownTraining(db, auth(), params.id);
  db.entrenamientos = db.entrenamientos.filter((t) => t.entrenamiento_id !== training.entrenamiento_id);
  removeBoard(training.entrenamiento_id);
  changed();
  return ok({ message: 'Entrenamiento eliminado correctamente' });
}

export default [
  ['POST', '/entrenamientos', createTraining],
  ['GET', '/entrenamientos', listTrainings],
  ['GET', '/entrenamientos/user/:id', listTrainingsOfCoach],
  ['PUT', '/entrenamientos/:id', updateTraining],
  ['DELETE', '/entrenamientos/:id', deleteTraining],
];
