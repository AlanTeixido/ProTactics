// Demo dataset for a fictional club. Dates are relative to the moment the demo
// is first opened so the calendar always looks current.
import { DEMO_ACCOUNTS } from './public';

// Bump when the shape of the seed changes: stored demo data is re-seeded.
export const SEED_VERSION = 1;

const CLUB_ID = DEMO_ACCOUNTS.club.id;
const JORDI = DEMO_ACCOUNTS.entrenador.id;
const MARTA = 12;
const ALEX = 14;

const crestSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 140'>
<circle cx='70' cy='70' r='70' fill='#0d3b66'/>
<defs><clipPath id='s'><path d='M70 22 106 33v31c0 24-15 40-36 49-21-9-36-25-36-49V33z'/></clipPath></defs>
<g clip-path='url(#s)'><rect width='140' height='140' fill='#1d6fb8'/><rect width='70' height='140' fill='#0d3b66'/>
<rect y='58' width='140' height='20' fill='#f4c430'/>
<path d='M30 93q10-7 20 0t20 0 20 0 20 0' fill='none' stroke='#fff' stroke-width='3.5'/>
<path d='M30 102q10-7 20 0t20 0 20 0 20 0' fill='none' stroke='#fff' stroke-width='3.5' opacity='.55'/></g>
<path d='M70 22 106 33v31c0 24-15 40-36 49-21-9-36-25-36-49V33z' fill='none' stroke='#f4c430' stroke-width='4'/>
<text x='70' y='73' font-family='Arial,Helvetica,sans-serif' font-size='13' font-weight='700' fill='#0d3b66' text-anchor='middle'>CEMA</text>
<text x='70' y='49' font-family='Arial,Helvetica,sans-serif' font-size='10' font-weight='700' fill='#f4c430' text-anchor='middle'>1987</text>
</svg>`;
const CREST = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(crestSvg)}`;

export function createSeed(now = new Date()) {
  const at = (days, hour = 10, minute = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    d.setHours(hour, minute, 0, 0);
    return d.toISOString();
  };
  // Dates at noon UTC render as the same calendar day in every time zone.
  const day = (days) => `${at(days, 12).slice(0, 10)}T12:00:00.000Z`;

  const clubs = [
    {
      club_id: CLUB_ID,
      nombre: 'CE Maresme Atlètic',
      correo: DEMO_ACCOUNTS.club.correo,
      ubicacion: 'Vilassar de Mar, Barcelona',
      foto_url: CREST,
      creado_en: at(-412, 9, 14),
    },
  ];

  const coach = (entrenador_id, nombre, correo, equipo, notas, created) => ({
    entrenador_id, nombre, correo, equipo, club_id: CLUB_ID,
    telefono: null, foto_url: null, notas, creado_en: created,
  });
  const entrenadores = [
    coach(JORDI, 'Jordi Puigvert Casals', DEMO_ACCOUNTS.entrenador.correo, 'Cadet A',
      'UEFA B. Responsable de la metodología de fútbol 11 del club.', at(-388, 18, 32)),
    coach(MARTA, 'Marta Soler Ribas', 'msoler@cema.example', 'Infantil B',
      'Coordinadora de fútbol formativo. Preparadora física titulada.', at(-301, 17, 5)),
    coach(ALEX, 'Àlex Ferrer Molina', 'aferrer@cema.example', 'Aleví A',
      'Primer año en el club. Viene de entrenar fútbol sala en categorías formativas.', at(-57, 19, 48)),
  ];

  const equipos = [
    { equipo_id: 21, nombre: 'Cadet A', categoria: 'Cadete', club_id: CLUB_ID, entrenador_id: JORDI, creado_en: at(-386, 10, 3) },
    { equipo_id: 22, nombre: 'Infantil B', categoria: 'Infantil', club_id: CLUB_ID, entrenador_id: MARTA, creado_en: at(-299, 11, 41) },
    { equipo_id: 24, nombre: 'Aleví A', categoria: 'Alevín', club_id: CLUB_ID, entrenador_id: ALEX, creado_en: at(-55, 9, 26) },
  ];

  let playerMinute = 0;
  const player = (jugador_id, nombre, apellido, posicion, dorsal, fecha_nacimiento, equipo_id, entrenador_id, daysAgo) => ({
    jugador_id, nombre, apellido, posicion, dorsal, fecha_nacimiento, equipo_id, entrenador_id,
    creado_en: at(-daysAgo, 20, (playerMinute += 7) % 60),
  });
  const jugadores = [
    // Cadet A (Jordi)
    player(101, 'Pol', 'Vidal Serra', 'Portero', 1, '2010-03-14', 21, JORDI, 380),
    player(102, 'Arnau', 'Roca Pujol', 'Defensa', 4, '2010-07-22', 21, JORDI, 380),
    player(103, 'Iker', 'Moreno Gil', 'Defensa', 5, '2011-01-09', 21, JORDI, 379),
    player(104, 'Hugo', 'Navarro Ruiz', 'Mediocentro', 6, '2010-05-18', 21, JORDI, 379),
    player(105, 'Biel', 'Font Castells', 'Mediocentro', 8, '2010-11-30', 21, JORDI, 377),
    player(106, 'Oriol', 'Mas Bosch', 'Delantero', 9, '2010-09-03', 21, JORDI, 377),
    player(107, 'Youssef', 'El Amrani', 'Delantero', 11, '2011-02-26', 21, JORDI, 41),
    // Infantil B (Marta)
    player(108, 'Martí', 'Riera Pons', 'Portero', 13, '2012-06-11', 22, MARTA, 296),
    player(109, 'Lucía', 'Ortega Vázquez', 'Defensa', 3, '2012-04-02', 22, MARTA, 296),
    player(110, 'Nil', 'Camps Ferrer', 'Defensa', 2, '2013-01-27', 22, MARTA, 295),
    player(111, 'Adrià', 'Sala Roig', 'Mediocentro', 10, '2012-10-15', 22, MARTA, 295),
    player(112, 'Mateo', 'Domínguez León', 'Mediocentro', 14, '2012-08-08', 22, MARTA, 202),
    player(113, 'Jan', 'Prats Valls', 'Delantero', 7, '2012-12-19', 22, MARTA, 202),
    // Aleví A (Àlex)
    player(114, 'Èric', 'Bonet Sanz', 'Portero', 1, '2014-02-17', 24, ALEX, 53),
    player(115, 'Leo', 'Castro Romero', 'Defensa', 3, '2014-09-05', 24, ALEX, 53),
    player(116, 'Abril', 'Comas Vila', 'Mediocentro', 8, '2015-03-21', 24, ALEX, 52),
    player(117, 'Daniel', 'Ibáñez Tur', 'Delantero', 9, '2014-06-29', 24, ALEX, 52),
    player(118, 'Roc', 'Planas Jové', 'Delantero', 11, '2014-11-12', 24, ALEX, 50),
  ];

  const training = (entrenamiento_id, entrenador_id, fields, dateOffset, jugadoresIds) => ({
    entrenamiento_id,
    entrenador_id,
    imagen_url: null,
    ...fields,
    fecha_entrenamiento: day(dateOffset),
    creado_en: at(Math.min(dateOffset, 0) - 2, 21, 17 + (entrenamiento_id % 40)),
    jugadores: jugadoresIds,
  });
  const entrenamientos = [
    training(301, JORDI, {
      titulo: 'Salida de balón contra presión alta',
      descripcion: 'Construcción desde el portero con dos centrales abiertos y el pivote entre líneas. El rival presiona con dos puntas: buscamos al tercer hombre para superar la primera línea y atacar el espacio a la espalda del mediocentro rival.',
      categoria: 'tactica',
      campo: 'Camp Municipal de Vilassar · medio campo',
      duracion_repeticion: { minutes: 18 }, repeticiones: 4, descanso: 2, valoracion: 4,
      notas: 'Insistir en el perfil corporal del pivote antes de recibir. Hugo y Biel alternan la altura.',
    }, -9, [101, 102, 103, 104, 105, 106, 107]),
    training(302, JORDI, {
      titulo: 'Rondo 5x2 y transición tras pérdida',
      descripcion: 'Rondo en un cuadrado de 12x12. A los seis pases seguidos, cambio de orientación a la mini-portería contraria. Si los defensores recuperan, transición inmediata 2x2 hacia la portería grande.',
      categoria: 'posesion',
      campo: 'Camp Municipal de Vilassar · zona de calentamiento',
      duracion_repeticion: { minutes: 12 }, repeticiones: 5, descanso: 1, valoracion: 5,
      notas: 'Máximo dos toques. Los que pierden el balón recogen conos al final.',
    }, -6, [102, 103, 104, 105, 106, 107]),
    training(303, JORDI, {
      titulo: 'Finalización tras centro lateral',
      descripcion: 'Oleadas de tres atacantes contra dos defensores. El extremo conduce hasta línea de fondo y elige entre centro al primer palo, al segundo palo o pase atrás al punto de penalti.',
      categoria: 'finalizacion',
      campo: 'Camp Municipal de Vilassar · área grande',
      duracion_repeticion: { minutes: 15 }, repeticiones: 3, descanso: 2, valoracion: 3,
      notas: 'Falta ataque al primer palo. Repetir el jueves con Youssef cerrando por dentro.',
    }, -2, [101, 102, 103, 106, 107]),
    training(304, JORDI, {
      titulo: 'Defensa de córners en zona mixta',
      descripcion: 'Tres jugadores en zona (primer palo, punto de penalti y segundo palo) y marcaje individual sobre sus tres mejores rematadores. Trabajo del despeje orientado y salida rápida a la contra.',
      categoria: 'abp',
      campo: 'Camp Municipal de Vilassar · área grande',
      duracion_repeticion: { minutes: 10 }, repeticiones: 4, descanso: 1, valoracion: 0,
      notas: 'Preparar antes del partido del sábado contra el líder.',
    }, 3, [101, 102, 103, 104, 105]),
    training(305, MARTA, {
      titulo: 'Circuito de fuerza y coordinación',
      descripcion: 'Seis estaciones de 45 segundos: escalera de coordinación, saltos a una pierna, plancha con toque de hombro, zancadas, sprint de 10 metros y conducción en eslalon.',
      categoria: 'fisica',
      campo: 'Pista polivalente del club',
      duracion_repeticion: { minutes: 8 }, repeticiones: 6, descanso: 1, valoracion: 4,
      notas: 'Lucía y Nil vuelven de molestias: carga reducida en los saltos.',
    }, -12, [108, 109, 110, 111, 112, 113]),
    training(306, ALEX, {
      titulo: 'Juego reducido 4x4 con porteros',
      descripcion: 'Partido en campo de 30x20 con porterías de fútbol 7. Gol válido solo si todos los jugadores del equipo han pasado el medio campo. Cambio de rol cada tres minutos.',
      categoria: 'posesion',
      campo: 'Campo de fútbol 7 · lado mar',
      duracion_repeticion: { minutes: 9 }, repeticiones: 4, descanso: 2, valoracion: 4,
      notas: 'Muy buena actitud. Abril dirige el juego, hay que darle más balón.',
    }, -4, [114, 115, 116, 117, 118]),
  ];

  // Same shape node-postgres returns for an INTERVAL column.
  const toInterval = (total) => {
    const interval = {};
    if (total >= 60) interval.hours = Math.floor(total / 60);
    if (total % 60) interval.minutes = total % 60;
    return interval;
  };
  const publish = (publicacion_id, entrenamiento, daysAfter, minute) => {
    const reps = entrenamiento.repeticiones;
    const total = entrenamiento.duracion_repeticion.minutes * reps + entrenamiento.descanso * (reps - 1);
    return {
      publicacion_id,
      entrenador_id: entrenamiento.entrenador_id,
      entrenamiento_id: entrenamiento.entrenamiento_id,
      titulo: entrenamiento.titulo,
      contenido: entrenamiento.descripcion,
      imagen_url: 'default.png',
      categoria: entrenamiento.categoria,
      campo: entrenamiento.campo,
      fecha_entrenamiento: entrenamiento.fecha_entrenamiento,
      duracion_repeticion: entrenamiento.duracion_repeticion,
      repeticiones: reps,
      total_duracion: toInterval(total),
      descanso: entrenamiento.descanso,
      notas_adicionales: entrenamiento.notas,
      creado_en: at(daysAfter, 22, minute),
    };
  };
  const find = (id) => entrenamientos.find((e) => e.entrenamiento_id === id);
  const publicaciones = [
    publish(45, find(306), -3, 12),
    publish(44, find(303), -1, 48),
    publish(43, find(302), -5, 3),
    publish(42, find(301), -8, 26),
    publish(41, find(305), -11, 39),
  ];

  // Likes come from the club's coaches and from coaches of other clubs that
  // follow the public feed (ids that don't belong to this club).
  const outsiders = (from, count) => Array.from({ length: count }, (_, i) => 9001 + from + i);
  const likesFor = (publicacion_id, entrenadorIds) => entrenadorIds.map((entrenador_id) => ({ publicacion_id, entrenador_id }));
  const likes = [
    ...likesFor(42, [MARTA, ALEX, ...outsiders(0, 21)]), // 23
    ...likesFor(43, [MARTA, ...outsiders(4, 13)]), // 14
    ...likesFor(44, outsiders(9, 6)), // 6
    ...likesFor(41, [JORDI, ...outsiders(2, 8)]), // 9
    ...likesFor(45, [JORDI, MARTA]), // 2
  ];

  const seguimientos = [
    { seguidor_id: JORDI, seguido_id: MARTA },
    { seguidor_id: MARTA, seguido_id: JORDI },
    { seguidor_id: ALEX, seguido_id: JORDI },
  ];

  // Saved tactics board for "Salida de balón contra presión alta" (same item
  // shape Draggable.vue stores: absolute pixel positions on the pitch).
  const boardPlayer = (id, x, y) => {
    const j = jugadores.find((p) => p.jugador_id === id);
    return { id, nombre: j.nombre, dorsal: j.dorsal, posicion: j.posicion, tipo: 'jugador', x, y, isDragging: false, offsetX: 0, offsetY: 0 };
  };
  const boardObject = (id, tipo, x, y) => ({
    id, tipo, nombre: tipo === 'pelota' ? 'Pelota' : 'Cono', x, y, isDragging: false, offsetX: 0, offsetY: 0,
  });
  const boards = {
    301: [
      boardPlayer(101, 92, 338),
      boardPlayer(102, 236, 168),
      boardPlayer(103, 236, 492),
      boardPlayer(104, 371, 344),
      boardPlayer(105, 512, 214),
      boardPlayer(106, 688, 322),
      boardPlayer(107, 634, 518),
      boardObject(1000, 'pelota', 146, 362),
      boardObject(1001, 'cono', 318, 84),
      boardObject(1002, 'cono', 318, 566),
      boardObject(1003, 'cono', 604, 84),
      boardObject(1004, 'cono', 604, 566),
    ],
  };

  const db = {
    version: SEED_VERSION,
    seq: { usuario: ALEX, equipo: 24, jugador: 118, entrenamiento: 306, publicacion: 45 },
    clubs,
    entrenadores,
    equipos,
    jugadores,
    entrenamientos,
    publicaciones,
    likes,
    seguimientos,
  };
  return { db, boards };
}
