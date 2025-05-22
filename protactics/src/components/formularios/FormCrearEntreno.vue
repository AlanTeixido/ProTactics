<template>
  <div class="crear-entreno">
    <div class="formulario-container">

      <!-- PRIMER PASO: NOMBRE Y EQUIPO -->
      <div class="input-group">
        <label for="titulo">Nombre del entrenamiento</label>
        <input v-model="titulo" id="titulo" type="text" placeholder="Ej. Rondo + Finalización" />
      </div>

      <div class="input-group">
        <label for="equipo">Selecciona un equipo</label>
        <select v-model.number="equipoSeleccionado" id="equipo">
          <option disabled value="">-- Selecciona un equipo --</option>
          <option v-for="equipo in equipos" :key="equipo.equipo_id" :value="equipo.equipo_id">
            {{ equipo.nombre }} ({{ equipo.categoria }})
          </option>
        </select>
      </div>

      <!-- BLOQUE CON DOS COLUMNAS: JUGADORES + FORMULARIO -->
      <div v-if="jugadores.length > 0" class="contenedor-entrenamiento">
        <!-- Jugadores -->
        <div class="jugadores-section">
          <h3>Selecciona jugadores:</h3>
          <ul class="jugadores-grid">
            <li v-for="jugador in jugadores" :key="jugador.jugador_id"
              :class="{ seleccionado: estaSeleccionado(jugador.jugador_id) }"
              @click="toggleSeleccionJugador(jugador.jugador_id)">
              {{ jugador.nombre }} {{ jugador.apellido }} - {{ jugador.dorsal }} ({{ jugador.posicion }})
            </li>
          </ul>
        </div>

        <!-- Formulario adicional -->
        <div v-if="jugadoresSeleccionados.length > 0" class="form-extra">
          <div class="input-group">
            <label for="descripcion">Descripción</label>
            <textarea v-model="descripcion" id="descripcion" rows="2"></textarea>
          </div>

          <div class="input-group">
            <label for="categoria">Categoría</label>
            <select v-model="categoria" id="categoria">
              <option disabled value="">-- Selecciona una categoría --</option>
              <option value="tecnica">ABP</option>
              <option value="fisica">Física</option>
              <option value="tactica">Táctica</option>
              <option value="psicologica">Finalización</option>
              <option value="psicologica">Posesión</option>
            </select>
          </div>

          <div class="input-group">
            <label for="fecha">Fecha</label>
            <input v-model="fecha_entrenamiento" id="fecha" type="date" />
          </div>

          <div class="input-group doble">
            <div>
              <label for="duracion">Duración (min)</label>
              <input v-model="duracion_repeticion" id="duracion" type="number" min="1" />
            </div>
            <div>
              <label for="repeticiones">Repeticiones</label>
              <input v-model="repeticiones" id="repeticiones" type="number" min="1" />
            </div>
          </div>

          <div class="input-group doble">
            <div>
              <label for="descanso">Descanso (min)</label>
              <input v-model="descanso" id="descanso" type="number" min="0" />
            </div>
            <div>
              <label for="valoracion">Valoración (0-5)</label>
              <input v-model="valoracion" id="valoracion" type="number" min="0" max="5" />
            </div>
          </div>

          <div class="input-group">
            <label for="imagen_url">Imagen (URL)</label>
            <input v-model="imagen_url" id="imagen_url" type="text" placeholder="https://..." />
          </div>

          <div class="input-group">
            <label for="notas">Notas</label>
            <textarea v-model="notas" id="notas" rows="2"></textarea>
          </div>

          <div class="boton-crear">
            <button @click="crearEntrenamiento">Crear Entrenamiento</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="mostrarPopup" class="popup-mensaje">
      {{ mensajePopup }}
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const titulo = ref('');
const descripcion = ref('');
const categoria = ref('');
const campo = ref('');
const fecha_entrenamiento = ref('');
const duracion_repeticion = ref(0);
const repeticiones = ref(1);
const descanso = ref(0);
const valoracion = ref(0);
const imagen_url = ref('');
const notas = ref('');

const equipos = ref([]);
const equipoSeleccionado = ref('');
const jugadores = ref([]);
const jugadoresSeleccionados = ref([]);

const obtenerEquipos = async () => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get('https://protactics-api.onrender.com/equipos/entrenador', {
    headers: { Authorization: `Bearer ${token}` },
  });
  equipos.value = res.data || [];
};

const obtenerJugadoresDelEquipo = async (equipoId) => {
  const token = localStorage.getItem('authToken');
  const res = await axios.get(`https://protactics-api.onrender.com/jugadores/equipo/${equipoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  jugadores.value = res.data || [];
};

watch(equipoSeleccionado, (nuevoEquipoId) => {
  jugadoresSeleccionados.value = [];
  if (nuevoEquipoId) obtenerJugadoresDelEquipo(nuevoEquipoId);
  else jugadores.value = [];
});

const toggleSeleccionJugador = (id) => {
  if (jugadoresSeleccionados.value.includes(id)) {
    jugadoresSeleccionados.value = jugadoresSeleccionados.value.filter(j => j !== id);
  } else {
    jugadoresSeleccionados.value.push(id);
  }
};

const estaSeleccionado = (id) => jugadoresSeleccionados.value.includes(id);

const crearEntrenamiento = async () => {
  if (
    !titulo.value ||
    !equipoSeleccionado.value ||
    jugadoresSeleccionados.value.length === 0 ||
    !categoria.value
  ) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      'https://protactics-api.onrender.com/entrenamientos',
      {
        titulo: titulo.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        campo: campo.value,
        fecha_entrenamiento: fecha_entrenamiento.value,
        duracion_repeticion: { minutes: duracion_repeticion.value },
        repeticiones: repeticiones.value,
        descanso: descanso.value,
        valoracion: valoracion.value,
        imagen_url: imagen_url.value,
        notas: notas.value,
        jugadores: jugadoresSeleccionados.value,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const mostrarPopup = ref(false);
    const mensajePopup = ref('');

    const mostrarMensaje = (mensaje) => {
      mensajePopup.value = mensaje;
      mostrarPopup.value = true;
      setTimeout(() => {
        mostrarPopup.value = false;
      }, 3000); // El popup desaparece tras 3 segundos
    };

    mostrarMensaje('✅ Entrenamiento creado correctamente');

    const deporte = categoria.value.trim().toLowerCase() || 'futbol';
    const jugadoresSeleccionadosData = jugadores.value.filter(j => jugadoresSeleccionados.value.includes(j.jugador_id));
    localStorage.setItem('jugadoresPizarra', JSON.stringify(jugadoresSeleccionadosData));
    localStorage.setItem('deporteSeleccionado', deporte);
    router.push(`/pizarra/${deporte}`);

    setTimeout(() => {
      titulo.value = '';
      descripcion.value = '';
      categoria.value = '';
      campo.value = '';
      fecha_entrenamiento.value = '';
      duracion_repeticion.value = 0;
      repeticiones.value = 1;
      descanso.value = 0;
      valoracion.value = 0;
      imagen_url.value = '';
      notas.value = '';
      equipoSeleccionado.value = '';
      jugadoresSeleccionados.value = [];
      jugadores.value = [];
    }, 500);
  } catch (error) {
    console.error('❌ Error creando entrenamiento:', error);
    mostrarMensaje('❌ Ocurrió un error al crear el entrenamiento.');
  }
};

onMounted(() => {
  obtenerEquipos();
});
</script>

<style setup>
.formulario-container {
  width: 100%;
  padding: 40px;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.input-group.doble {
  display: flex;
  gap: 20px;
}

.input-group.doble>div {
  flex: 1;
}

label {
  font-weight: 500;
  margin-bottom: 8px;
  color: #e2e8f0;
}

input,
select,
textarea {
  padding: 10px;
  border-radius: 8px;
  background-color: #334155;
  color: white;
  border: none;
  font-size: 1rem;
}

.contenedor-entrenamiento {
  display: flex;
  gap: 30px;
  height: 80vh;
  margin-top: 30px;
}

/* Sección de jugadores a la izquierda */
.jugadores-section {
  flex: 2;
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;
}

/* Grid de jugadores */
.jugadores-grid {
  display: flex;

  gap: 20px;
  list-style: none;
  padding: 0;
}

.jugadores-grid li {
  background-color: #1e293b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 130px;
  height: 100px;
  transition: 0.3s;

}

.jugadores-grid li:hover {
  transform: scale(1.03);
  background-color: #334155;
}

.jugadores-grid li.seleccionado {
  background-color: #10b981;
  color: #0f172a;
  font-weight: bold;
}

/* Formulario adicional a la derecha */
.form-extra {
  flex: 1;
  overflow-y: auto;
  background-color: #0f172a;
  padding: 20px;
  border-radius: 8px;
  max-height: 80vh;
  min-width: 300px;
}

/* Botón de crear */
.boton-crear {
  margin-top: 30px;
  text-align: right;
}

.boton-crear button {
  background-color: #10b981;
  color: #0f172a;
  font-weight: bold;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.boton-crear button:hover {
  background-color: #0ea472;
}

.popup-mensaje {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #10b981;
  color: #0f172a;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: aparecer 0.3s ease-out;
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
