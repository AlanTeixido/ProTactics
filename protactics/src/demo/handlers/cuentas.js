// /auth, /clubes, /entrenadores and /usuarios. Mirrors ProTactics-API
// (routes/auth.js, clubController.js, entrenadorController.js).
// Passwords are never stored: in the demo any password is accepted.
import { DEMO_ACCOUNTS } from '../public';
import { signToken } from '../token';
import { nextId, removeBoard } from '../db';
import {
  fail, ok, created, nowIso, toId, isBlank, sameEmail, readPhoto, byNewest, clubIdOf,
} from '../http';

const findAccountByEmail = (db, correo) => {
  const club = db.clubs.find((c) => sameEmail(c.correo, correo));
  if (club) return { tipo: 'club', id: club.club_id, nombre: club.nombre, correo: club.correo };
  const coach = db.entrenadores.find((e) => sameEmail(e.correo, correo));
  if (coach) return { tipo: 'entrenador', id: coach.entrenador_id, nombre: coach.nombre, correo: coach.correo };
  return null;
};

const findDemoAccount = (db, rol) => {
  const { id } = DEMO_ACCOUNTS[rol];
  if (rol === 'club') {
    const club = db.clubs.find((c) => c.club_id === id);
    return club && { tipo: 'club', id, nombre: club.nombre, correo: club.correo };
  }
  const coach = db.entrenadores.find((e) => e.entrenador_id === id);
  return coach && { tipo: 'entrenador', id, nombre: coach.nombre, correo: coach.correo };
};

const emailTaken = (db, correo, except = {}) =>
  db.clubs.some((c) => c.club_id !== except.club_id && sameEmail(c.correo, correo))
  || db.entrenadores.some((e) => e.entrenador_id !== except.entrenador_id && sameEmail(e.correo, correo));

// A club can manage its own coaches; a coach can manage their own profile.
export const findCoachFor = (db, user, id) => {
  const coach = db.entrenadores.find((e) => e.entrenador_id === toId(id));
  if (!coach) return null;
  if (user.tipo === 'club' && coach.club_id === user.id) return coach;
  if (user.tipo === 'entrenador' && coach.entrenador_id === user.id) return coach;
  return null;
};

function login({ body, db }) {
  const { correo, password, demo } = body;
  let account;
  if (demo === 'club' || demo === 'entrenador') {
    account = findDemoAccount(db, demo);
  } else {
    if (isBlank(correo) || isBlank(password)) fail(400, 'Falten dades.');
    account = findAccountByEmail(db, correo);
  }
  if (!account) fail(404, 'Usuari no trobat.');

  const token = signToken({ id: account.id, tipo: account.tipo, correo: account.correo });
  return ok({
    message: `Login ${account.tipo} correcte`,
    token,
    rol: account.tipo,
    id: account.id,
    nombre: account.nombre,
    email: account.correo,
  });
}

function createClub(db, { nombre, correo, ubicacion }) {
  const club = {
    club_id: nextId(db, 'usuario'),
    nombre: String(nombre).trim(),
    correo: String(correo).trim(),
    ubicacion: ubicacion || null,
    foto_url: null,
    creado_en: nowIso(),
  };
  db.clubs.push(club);
  return club;
}

function registerClub({ body, db, changed }) {
  const { nombre, correo, password } = body;
  if (isBlank(nombre) || isBlank(correo) || isBlank(password)) fail(400, 'Tots els camps són obligatoris.');
  if (emailTaken(db, correo)) fail(409, 'El correu ja està registrat com a club.');
  const club = createClub(db, body);
  changed();
  return created({ message: '✅ Club registrat!', club: { club_id: club.club_id, nombre: club.nombre, correo: club.correo } });
}

function createCoach(db, { nombre, correo, equipo }, clubId) {
  const coach = {
    entrenador_id: nextId(db, 'usuario'),
    nombre: String(nombre).trim(),
    correo: String(correo).trim(),
    equipo: equipo || null,
    club_id: clubId,
    telefono: null,
    foto_url: null,
    notas: null,
    creado_en: nowIso(),
  };
  db.entrenadores.push(coach);
  return coach;
}

const coachSummary = ({ entrenador_id, nombre, correo, equipo, club_id }) => ({ entrenador_id, nombre, correo, equipo, club_id });

function registerEntrenadorPublic({ body, db, changed }) {
  const { nombre, correo, password, club_id } = body;
  if (isBlank(nombre) || isBlank(correo) || isBlank(password) || isBlank(club_id)) fail(400, 'Tots els camps són obligatoris.');
  if (!db.clubs.some((c) => c.club_id === toId(club_id))) fail(400, 'Club no vàlid.');
  if (emailTaken(db, correo)) fail(409, 'El correu ja està registrat com a entrenador.');
  const coach = createCoach(db, body, toId(club_id));
  changed();
  return created({ message: '✅ Entrenador registrat!', entrenador: coachSummary(coach) });
}

// ---- /clubes ---------------------------------------------------------------

function listClubs({ db }) {
  return ok(db.clubs.map((c) => ({ ...c })));
}

function getClub({ params, db, auth }) {
  auth();
  const club = db.clubs.find((c) => c.club_id === toId(params.id));
  if (!club) fail(404, 'Club no trobat.');
  return ok(club);
}

const ownClub = (db, user, id) => {
  const club = db.clubs.find((c) => c.club_id === toId(id));
  if (!club) fail(404, 'Club no trobat.');
  if (user.tipo !== 'club' || user.id !== club.club_id) fail(403, 'No tens permís per modificar aquest club.');
  return club;
};

async function updateClub({ params, body, db, auth, changed }) {
  const club = ownClub(db, auth(), params.id);
  if (isBlank(body.nombre) || isBlank(body.correo)) fail(400, 'Nom i correu són obligatoris.');
  if (emailTaken(db, body.correo, { club_id: club.club_id })) fail(409, 'Ja existeix un compte amb aquest correu.');
  const foto = await readPhoto(body);
  Object.assign(club, {
    nombre: String(body.nombre).trim(),
    correo: String(body.correo).trim(),
    ubicacion: body.ubicacion || null,
    foto_url: foto === undefined ? club.foto_url : foto,
  });
  changed();
  return ok({ message: 'Perfil actualitzat correctament', foto_url: club.foto_url });
}

function changePassword({ body }) {
  if (isBlank(body.contrasena_actual) || isBlank(body.contrasena_nova)) fail(400, 'Falten camps obligatoris.');
  return ok({ message: 'Contrasenya actualitzada correctament' });
}

function changeClubPassword(ctx) {
  ownClub(ctx.db, ctx.auth(), ctx.params.id);
  return changePassword(ctx);
}

// ---- /entrenadores -----------------------------------------------------------

function myCoachProfile({ db, auth }) {
  const user = auth();
  if (user.tipo !== 'entrenador') fail(403, 'Accés no autoritzat. Només entrenadors.');
  const coach = db.entrenadores.find((e) => e.entrenador_id === user.id);
  if (!coach) fail(404, 'Entrenador no trobat');
  return ok(coach);
}

function registerCoach({ body, db, auth, changed }) {
  const user = auth();
  if (user.tipo !== 'club') fail(403, 'Només els clubs poden crear entrenadors.');
  const { nombre, correo, password } = body;
  if (isBlank(nombre) || isBlank(correo) || isBlank(password)) fail(400, 'Falten camps obligatoris.');
  if (emailTaken(db, correo)) fail(409, 'Ja existeix un entrenador amb aquest correu.');
  const coach = createCoach(db, body, user.id);
  changed();
  return created({ message: 'Entrenador creat correctament', entrenador: coachSummary(coach) });
}

function listCoaches({ db, auth }) {
  const clubId = clubIdOf(auth());
  return ok(db.entrenadores.filter((e) => e.club_id === clubId).sort(byNewest));
}

function getCoach({ params, db, auth }) {
  const coach = findCoachFor(db, auth(), params.id);
  if (!coach) fail(404, 'Entrenador no trobat');
  return ok(coach);
}

async function updateCoach({ params, body, db, auth, changed }) {
  const coach = findCoachFor(db, auth(), params.id);
  if (!coach) fail(404, 'Entrenador no trobat');
  if ('nombre' in body && isBlank(body.nombre)) fail(400, 'El nom és obligatori.');
  if ('correo' in body) {
    if (isBlank(body.correo)) fail(400, 'El correu és obligatori.');
    if (emailTaken(db, body.correo, { entrenador_id: coach.entrenador_id })) fail(409, 'Ja existeix un compte amb aquest correu.');
  }
  ['nombre', 'correo', 'equipo', 'telefono', 'notas'].forEach((key) => {
    if (key in body) coach[key] = typeof body[key] === 'string' ? body[key].trim() || null : body[key] ?? null;
  });
  const foto = await readPhoto(body);
  if (foto !== undefined) coach.foto_url = foto;
  changed();
  return ok({ message: 'Entrenador actualitzat correctament' });
}

function changeCoachPassword(ctx) {
  if (!findCoachFor(ctx.db, ctx.auth(), ctx.params.id)) fail(404, 'Entrenador no trobat');
  return changePassword(ctx);
}

function deleteCoach({ params, db, auth, changed }) {
  const user = auth();
  if (user.tipo !== 'club') fail(403, 'Només els clubs poden eliminar entrenadors.');
  const coach = findCoachFor(db, user, params.id);
  if (!coach) fail(404, 'Entrenador no trobat');

  const id = coach.entrenador_id;
  db.entrenadores = db.entrenadores.filter((e) => e.entrenador_id !== id);
  db.entrenamientos
    .filter((t) => t.entrenador_id === id)
    .forEach((t) => removeBoard(t.entrenamiento_id));
  db.entrenamientos = db.entrenamientos.filter((t) => t.entrenador_id !== id);
  const pubs = new Set(db.publicaciones.filter((p) => p.entrenador_id === id).map((p) => p.publicacion_id));
  db.publicaciones = db.publicaciones.filter((p) => !pubs.has(p.publicacion_id));
  db.likes = db.likes.filter((l) => l.entrenador_id !== id && !pubs.has(l.publicacion_id));
  db.seguimientos = db.seguimientos.filter((s) => s.seguidor_id !== id && s.seguido_id !== id);
  db.equipos.forEach((e) => { if (e.entrenador_id === id) e.entrenador_id = null; });
  db.jugadores.forEach((j) => { if (j.entrenador_id === id) j.entrenador_id = null; });
  changed();
  return ok({ message: 'Entrenador eliminat correctament' });
}

// ---- /usuarios (the frontend asks for /usuarios/:id, not in the real API) ----

function getUsuario({ params, db }) {
  const id = toId(params.id);
  const coach = db.entrenadores.find((e) => e.entrenador_id === id);
  if (coach) return ok({ id, rol: 'entrenador', nombre: coach.nombre, correo: coach.correo, foto_url: coach.foto_url });
  const club = db.clubs.find((c) => c.club_id === id);
  if (club) return ok({ id, rol: 'club', nombre: club.nombre, correo: club.correo, foto_url: club.foto_url });
  return fail(404, 'Usuari no trobat.');
}

function getResumen({ params, query, db, auth }) {
  auth();
  const id = toId(params.id);
  if (query.rol === 'entrenador') {
    return ok({
      trainings: String(db.entrenamientos.filter((t) => t.entrenador_id === id).length),
      shared: String(db.publicaciones.filter((p) => p.entrenador_id === id).length),
      followers: String(db.seguimientos.filter((s) => s.seguido_id === id).length),
    });
  }
  if (query.rol === 'club') {
    const coaches = new Set(db.entrenadores.filter((e) => e.club_id === id).map((e) => e.entrenador_id));
    return ok({
      entrenadores: String(coaches.size),
      shared: String(db.publicaciones.filter((p) => coaches.has(p.entrenador_id)).length),
    });
  }
  return fail(404, 'No se encontró resumen para este rol.');
}

export default [
  ['POST', '/auth/login', login],
  ['POST', '/auth/register/club', registerClub],
  ['POST', '/auth/register/entrenador', registerEntrenadorPublic],

  ['GET', '/clubes', listClubs],
  ['POST', '/clubes/register', registerClub],
  ['GET', '/clubes/:id', getClub],
  ['PUT', '/clubes/:id', updateClub],
  ['PUT', '/clubes/:id/password', changeClubPassword],

  ['GET', '/entrenadores/me', myCoachProfile],
  ['POST', '/entrenadores/register', registerCoach],
  ['GET', '/entrenadores', listCoaches],
  ['GET', '/entrenadores/:id', getCoach],
  ['PUT', '/entrenadores/:id', updateCoach],
  ['DELETE', '/entrenadores/:id', deleteCoach],
  ['PUT', '/entrenadores/:id/password', changeCoachPassword],

  ['GET', '/usuarios/:id', getUsuario],
  ['GET', '/usuarios/:id/resumen', getResumen],
];
