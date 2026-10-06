// /equipos and /jugadores. Mirrors ProTactics-API equipoController.js and
// jugadorController.js: teams belong to a club, players to the coach who
// registered them.
import { nextId } from '../db';
import { parseCsv, normalizeKey } from '../csv';
import {
  fail, ok, created, nowIso, toId, isBlank, isFile, byNewest, clubIdOf,
} from '../http';

// ---- /equipos ------------------------------------------------------------------

const clubTeams = (db, clubId) => db.equipos.filter((e) => e.club_id === clubId).sort(byNewest);

const withCoachName = (db) => (team) => ({
  ...team,
  entrenador_nombre: db.entrenadores.find((c) => c.entrenador_id === team.entrenador_id)?.nombre ?? null,
});

const requireClub = (user, error) => {
  if (user.tipo !== 'club') fail(403, error);
  return user;
};

function createTeam({ body, db, auth, changed }) {
  const user = requireClub(auth(), 'No tens permís per crear equips.');
  if (isBlank(body.nombre) || isBlank(body.categoria)) fail(400, 'Falten camps obligatoris.');
  const equipo = {
    equipo_id: nextId(db, 'equipo'),
    nombre: String(body.nombre).trim(),
    categoria: String(body.categoria).trim(),
    club_id: user.id,
    entrenador_id: null,
    creado_en: nowIso(),
  };
  db.equipos.push(equipo);
  changed();
  return created({ message: 'Equip creat correctament', equipo });
}

function listTeams({ db, auth }) {
  return ok(clubTeams(db, clubIdOf(auth())).map(withCoachName(db)));
}

function listCoachTeams({ db, auth }) {
  return ok(clubTeams(db, clubIdOf(auth())));
}

function myTeams(ctx) {
  const user = ctx.auth();
  if (user.tipo === 'club') return listTeams(ctx);
  if (user.tipo === 'entrenador') return listCoachTeams(ctx);
  return fail(403, 'Tipus d\'usuari no suportat.');
}

const ownTeam = (db, user, id) => {
  const team = db.equipos.find((e) => e.equipo_id === toId(id) && e.club_id === user.id);
  if (!team) fail(404, 'Equip no trobat.');
  return team;
};

function updateTeam({ params, body, db, auth, changed }) {
  const team = ownTeam(db, requireClub(auth(), 'No tens permís per editar equips.'), params.id);
  if ('nombre' in body && isBlank(body.nombre)) fail(400, 'El nom de l\'equip és obligatori.');
  if (!isBlank(body.nombre)) team.nombre = String(body.nombre).trim();
  if (!isBlank(body.categoria)) team.categoria = String(body.categoria).trim();
  changed();
  return ok({ message: 'Equip actualitzat correctament' });
}

function deleteTeam({ params, db, auth, changed }) {
  const team = ownTeam(db, requireClub(auth(), 'No tens permís per eliminar equips.'), params.id);
  db.equipos = db.equipos.filter((e) => e.equipo_id !== team.equipo_id);
  db.jugadores.forEach((j) => { if (j.equipo_id === team.equipo_id) j.equipo_id = null; });
  changed();
  return ok({ message: 'Equip eliminat correctament' });
}

// ---- /jugadores ----------------------------------------------------------------

const requireCoach = (user, error) => {
  if (user.tipo !== 'entrenador') fail(403, error);
  return user;
};

const dorsalTaken = (db, dorsal, entrenadorId, exceptId = null) =>
  db.jugadores.some((j) => j.entrenador_id === entrenadorId && j.dorsal === dorsal && j.jugador_id !== exceptId);

const teamInClub = (db, equipoId, clubId) => db.equipos.find((e) => e.equipo_id === toId(equipoId) && e.club_id === clubId);

function addPlayer(db, user, { nombre, apellido, dorsal, posicion, equipo_id, fecha_nacimiento }) {
  const jugador = {
    jugador_id: nextId(db, 'jugador'),
    nombre: String(nombre).trim(),
    apellido: String(apellido).trim(),
    dorsal,
    posicion: String(posicion).trim(),
    fecha_nacimiento: fecha_nacimiento || null,
    entrenador_id: user.id,
    equipo_id,
    creado_en: nowIso(),
  };
  db.jugadores.push(jugador);
  return jugador;
}

function registerPlayer({ body, db, auth, changed }) {
  const user = requireCoach(auth(), 'Només els entrenadors poden registrar jugadors.');
  const dorsal = toId(body.dorsal);
  if (isBlank(body.nombre) || isBlank(body.apellido) || dorsal === null || isBlank(body.posicion) || isBlank(body.equipo_id)) {
    fail(400, 'Tots els camps són obligatoris, inclòs l\'equip.');
  }
  const team = teamInClub(db, body.equipo_id, user.club_id);
  if (!team) fail(400, 'L\'equip seleccionat no és del teu club.');
  if (dorsalTaken(db, dorsal, user.id)) fail(409, 'Ja existeix un jugador amb aquest dorsal.');

  const jugador = addPlayer(db, user, { ...body, dorsal, equipo_id: team.equipo_id });
  changed();
  const { fecha_nacimiento, creado_en, ...summary } = jugador;
  return created({ message: 'Jugador creat correctament', jugador: summary });
}

function listPlayers({ db, auth }) {
  const user = auth();
  if (user.tipo === 'club') {
    const teams = new Set(db.equipos.filter((e) => e.club_id === user.id).map((e) => e.equipo_id));
    return ok(db.jugadores.filter((j) => teams.has(j.equipo_id)).sort(byNewest));
  }
  return ok(db.jugadores.filter((j) => j.entrenador_id === user.id).sort(byNewest));
}

function teamPlayers({ params, db, auth }) {
  const team = teamInClub(db, params.id, clubIdOf(auth()));
  if (!team) return ok([]);
  return ok(db.jugadores.filter((j) => j.equipo_id === team.equipo_id).sort(byNewest));
}

const ownPlayer = (db, user, id) => {
  const player = db.jugadores.find((j) => j.jugador_id === toId(id) && j.entrenador_id === user.id);
  if (!player) fail(404, 'Jugador no trobat');
  return player;
};

function getPlayer({ params, db, auth }) {
  return ok(ownPlayer(db, auth(), params.id));
}

function updatePlayer({ params, body, db, auth, changed }) {
  const user = auth();
  const player = ownPlayer(db, user, params.id);
  const dorsal = 'dorsal' in body ? toId(body.dorsal) : player.dorsal;
  if (dorsal === null) fail(400, 'El dorsal és obligatori.');
  if (dorsalTaken(db, dorsal, user.id, player.jugador_id)) fail(409, 'Ja existeix un altre jugador amb aquest dorsal.');
  if (!isBlank(body.equipo_id) && !teamInClub(db, body.equipo_id, user.club_id)) fail(400, 'L\'equip seleccionat no és del teu club.');

  ['nombre', 'apellido', 'posicion', 'fecha_nacimiento'].forEach((key) => {
    if (!isBlank(body[key])) player[key] = String(body[key]).trim();
  });
  player.dorsal = dorsal;
  if (!isBlank(body.equipo_id)) player.equipo_id = toId(body.equipo_id);
  changed();
  return ok({ message: 'Jugador actualitzat correctament' });
}

function deletePlayer({ params, db, auth, changed }) {
  const player = ownPlayer(db, auth(), params.id);
  db.jugadores = db.jugadores.filter((j) => j.jugador_id !== player.jugador_id);
  db.entrenamientos.forEach((t) => {
    if (Array.isArray(t.jugadores)) t.jugadores = t.jugadores.filter((id) => id !== player.jugador_id);
  });
  changed();
  return ok({ message: 'Jugador eliminat correctament' });
}

// ---- CSV import ----------------------------------------------------------------

const POSITIONS = [
  ['Portero', ['portero', 'porter', 'portera', 'guardameta', 'gk']],
  ['Defensa', ['defensa', 'defensor', 'central', 'lateral', 'carrilero']],
  ['Mediocentro', ['mediocentro', 'medio', 'migcampista', 'centrocampista', 'pivote', 'pivot', 'interior', 'mediapunta']],
  ['Delantero', ['delantero', 'davanter', 'davantera', 'extremo', 'extrem', 'punta', 'ariete']],
];

const normalizePosition = (value) => {
  const key = normalizeKey(value);
  const match = POSITIONS.find(([, aliases]) => aliases.some((alias) => key.startsWith(alias)));
  return match ? match[0] : String(value).trim();
};

const pick = (row, ...keys) => keys.map((k) => row[k]).find((v) => !isBlank(v)) ?? '';

function resolveTeam(db, user, row) {
  const teams = db.equipos.filter((e) => e.club_id === user.club_id);
  const byId = teams.find((e) => e.equipo_id === toId(row.equipo_id));
  if (byId) return byId;
  const name = normalizeKey(pick(row, 'equipo', 'equip'));
  if (name) {
    const byName = teams.find((e) => normalizeKey(e.nombre) === name);
    if (byName) return byName;
  }
  const categoria = normalizeKey(pick(row, 'categoria'));
  if (!categoria) return null;
  const sameCategory = teams.filter((e) => normalizeKey(e.categoria) === categoria);
  return sameCategory.find((e) => e.entrenador_id === user.id) || sameCategory[0] || null;
}

async function uploadCsv({ body, db, auth, changed }) {
  const user = requireCoach(auth(), 'Només els entrenadors poden importar jugadors.');
  if (!isFile(body.csv)) fail(400, 'No s\'ha enviat cap arxiu.');

  let rows;
  try {
    rows = parseCsv(await body.csv.text());
  } catch {
    fail(500, 'Error processant l\'arxiu CSV.');
  }

  let creados = 0;
  let duplicados = 0;
  let omitidos = 0;
  rows.forEach((row) => {
    const nombre = pick(row, 'nombre', 'nom');
    const apellido = pick(row, 'apellido', 'apellidos', 'cognom', 'cognoms');
    const dorsal = toId(pick(row, 'dorsal'));
    const posicion = normalizePosition(pick(row, 'posicion', 'posicio'));
    const team = resolveTeam(db, user, row);
    if (!nombre || !apellido || dorsal === null || !posicion || !team) {
      omitidos++;
      return;
    }
    if (dorsalTaken(db, dorsal, user.id)) {
      duplicados++;
      return;
    }
    addPlayer(db, user, {
      nombre, apellido, dorsal, posicion, equipo_id: team.equipo_id,
      fecha_nacimiento: pick(row, 'fecha_nacimiento', 'data_naixement') || null,
    });
    creados++;
  });

  if (creados) changed();
  return ok({
    mensaje: 'CSV processat correctament',
    jugadors_creats: creados,
    duplicats: duplicados,
    omesos: omitidos,
  });
}

export default [
  ['POST', '/equipos', createTeam],
  ['GET', '/equipos', listTeams],
  ['GET', '/equipos/entrenador', listCoachTeams],
  ['GET', '/equipos/mis-equipos', myTeams],
  ['PUT', '/equipos/:id', updateTeam],
  ['DELETE', '/equipos/:id', deleteTeam],

  ['GET', '/jugadores/equipo/:id', teamPlayers],
  ['POST', '/jugadores/upload-csv', uploadCsv],
  ['POST', '/jugadores/register', registerPlayer],
  ['GET', '/jugadores', listPlayers],
  ['GET', '/jugadores/:id', getPlayer],
  ['PUT', '/jugadores/:id', updatePlayer],
  ['DELETE', '/jugadores/:id', deletePlayer],
];
