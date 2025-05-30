<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonCrearJugador from '@/components/botones/ButtonCrearJugador.vue';
import ButtonAtras from '@/components/botones/ButtonAtras.vue';
import ButtonCrearJugadorCSV from '@/components/botones/ButtonCrearJugadorCSV.vue';

const jugadores = ref([]);
const equipos = ref([]);
const user = ref({
  id: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "Usuari",
  rol: localStorage.getItem("userRol") || "desconegut",
});

const jugadorEditando = ref(null);
const editData = ref({ nombre: '', apellido: '', posicion: '', dorsal: '', equipo_id: '' });
const popupEliminar = ref(false);
const jugadorEliminarId = ref(null);

const filtroNombre = ref('');
const filtroPosicion = ref('');
const filtroDorsal = ref('');

const jugadoresFiltrados = computed(() => {
  return jugadores.value.filter(j => {
    const nombreCompleto = `${j.nombre} ${j.apellido}`.toLowerCase();
    const coincideNombre = nombreCompleto.includes(filtroNombre.value.toLowerCase());
    const coincidePosicion = filtroPosicion.value === '' || j.posicion === filtroPosicion.value;
    const coincideDorsal = filtroDorsal.value === '' || j.dorsal?.toString().includes(filtroDorsal.value);
    return coincideNombre && coincidePosicion && coincideDorsal;
  });
});

const cargarJugadores = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`https://protactics-api.onrender.com/jugadores`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    jugadores.value = response.data || [];
  } catch (error) {
    console.error("Error carregant jugadors:", error);
  }
};

const cargarEquipos = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const rol = user.value.rol;

    const endpoint =
      rol === 'entrenador'
        ? 'https://protactics-api.onrender.com/equipos/entrenador'
        : 'https://protactics-api.onrender.com/equipos';

    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    equipos.value = response.data;
  } catch (error) {
    console.error("Error carregant equips:", error);
  }
};

const eliminarJugador = async () => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`https://protactics-api.onrender.com/jugadores/${jugadorEliminarId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    jugadores.value = jugadores.value.filter(j => j.jugador_id !== jugadorEliminarId.value);
    popupEliminar.value = false;
  } catch (error) {
    console.error("❌ Error eliminant jugador:", error);
    alert("No s'ha pogut eliminar el jugador.");
  }
};

const iniciarEdicion = (jugador) => {
  jugadorEditando.value = jugador.jugador_id;
  editData.value = { ...jugador };
};

const cancelarEdicion = () => {
  jugadorEditando.value = null;
  editData.value = { nombre: '', apellido: '', posicion: '', dorsal: '', equipo_id: '' };
};

const guardarEdicion = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.put(`https://protactics-api.onrender.com/jugadores/${id}`, editData.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    jugadorEditando.value = null;
    await cargarJugadores();
  } catch (error) {
    console.error("❌ Error actualitzant jugador:", error);
    alert("No s'ha pogut actualitzar el jugador.");
  }
};

const confirmarEliminarJugador = (id) => {
  jugadorEliminarId.value = id;
  popupEliminar.value = true;
};

const cancelarEliminar = () => {
  jugadorEliminarId.value = null;
  popupEliminar.value = false;
};

onMounted(() => {
  cargarJugadores();
  cargarEquipos();
});
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras />
      <h2 class="titulo">Gestión de jugadores</h2>
      <div class="rol-badge">Accediendo como <strong>{{ user.rol }}</strong></div>

      <ButtonCrearJugador />
      <ButtonCrearJugadorCSV />


      <div class="jugadors-llista">
        <h3>Jugadores de tu equipo:</h3>
        <div v-if="jugadores.length === 0" class="empty-msg">
          Todavía no has registrado jugadores.
        </div>

        <div class="filtros-jugadores">
          <input v-model="filtroNombre" placeholder="Filtrar por nombre o apellido" />
          <select v-model="filtroPosicion">
            <option value="">Todas las posiciones</option>
            <option value="Portero">Portero</option>
            <option value="Defensa">Defensa</option>
            <option value="Mediocentro">Mediocentro</option>
            <option value="Delantero">Delantero</option>
          </select>
          <input v-model="filtroDorsal" min="0" type="number" placeholder="Filtrar por dorsal" />
        </div>

        <ul class="jugadors">
          <li v-for="j in jugadoresFiltrados" :key="j.jugador_id" class="jugador">
            <div v-if="jugadorEditando !== j.jugador_id" class="jugador-info">
              <div class="camiseta-jugador" @click="iniciarEdicion(j)">
                <strong class="nombre">{{ j.nombre }} {{ j.apellido }}</strong>
                <span class="dorsal">{{ j.dorsal }}</span>
              </div>
              <!--<div class="equipo-nombre">
                {{ equipos.find(e => e.equipo_id === j.equipo_id)?.nombre || 'Sin equipo' }}
              </div>-->
            </div>

            <div v-else class="jugador-info">
              <input v-model="editData.nombre" placeholder="Nombre" />
              <input v-model="editData.apellido" placeholder="Apellido" />
              <select v-model="editData.posicion">
                <option value="">Posición</option>
                <option value="Portero">Portero</option>
                <option value="Defensa">Defensa</option>
                <option value="Mediocentro">Mediocentro</option>
                <option value="Delantero">Delantero</option>
              </select>
              <input v-model="editData.dorsal" min="0" type="number" placeholder="Dorsal" />
              <select v-model.number="editData.equipo_id">
                <option disabled value="">Selecciona equipo</option>
                <option v-for="equipo in equipos" :key="equipo.equipo_id" :value="equipo.equipo_id">
                  {{ equipo.nombre }} ({{ equipo.categoria }})
                </option>
              </select>

              <div class="botones">
                <button class="btn-guardar" @click="guardarEdicion(j.jugador_id)">
                  <img src="../assets/img/guardar.png" class="imgAction" />
                </button>
                <button class="btn-cancelar" @click="cancelarEdicion()">
                  <img src="../assets/img/izquierda.png" class="imgAction" />
                </button>
                <button class="btn-eliminar" @click="confirmarEliminarJugador(j.jugador_id)">
                  <img src="../assets/img/cruzar.png" />
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Popup para eliminar jugador -->
  <div v-if="popupEliminar" class="popup-eliminar">
    <div class="popup-content">
      <h3>¿Estás seguro de que quieres eliminar al jugador?</h3>
      <div class="popup-botones">
        <button @click="eliminarJugador">Sí, eliminar</button>
        <button @click="cancelarEliminar">Cancelar</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.dashboard-container {
  flex: 1;
  margin-left: 250px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
}

.rol-badge {
  background-color: #ffffff22;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.95rem;
  color: #e2e8f0;
  width: fit-content;
}

.crear-jugador-box {
  margin-top: 15px;
  ;
  margin-bottom: 30px;
  width: fit-content;
  gap: 20px;
}

.jugadors-llista h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.empty-msg {
  color: #cbd5e1;
  font-style: italic;
}

.jugadors {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 25px;
  padding: 0;
}


.camiseta-jugador:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.jugador-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}


.jugador-info input {
  background-color: #334155;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  width: 100%;
}

.jugador-info select {
  background-color: #334155;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  width: 107%;
}

.botones {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-delete,
.btn-edit,
.btn-guardar,
.btn-cancelar {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-delete {
  background: #dc2626;
  color: white;
}

.btn-delete:hover {
  background: #b91c1c;
}

.btn-edit {
  background: #4b5563;
  color: white;
}

.btn-edit:hover {
  background: #374151;
}

.btn-guardar {
  color: white;
  background-color: transparent;
}


.btn-cancelar {
  background-color: transparent;
  color: rgb(255, 255, 255);
  font-weight: 400;
}

.btn-eliminar {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.btn-eliminar img {
  width: 20px;
  height: 20px;
}

.camiseta-jugador {
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

.nombre {
  font-size: 108%;
  font-weight: 400;
}

.dorsal {
  font-size: 300%;
  font-weight: 600;
}

.popup-eliminar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #1e293b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.popup-botones button {
  padding: 8px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup-botones button:first-child {
  background-color: #dc2626;
  color: white;
}

.popup-botones button:first-child:hover {
  background-color: #b91c1c;
}

.popup-botones button:last-child {
  background-color: #4b5563;
  color: white;
}

.popup-botones button:last-child:hover {
  background-color: #374151;
}

.imgAction {
  width: 20px;
  height: 20px;
}

.filtros-jugadores {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filtros-jugadores input,
.filtros-jugadores select {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #334155;
  color: white;
  font-size: 0.95rem;
}

/* Tablets - pantallas medianas (entre 768px y 1024px) */
@media (max-width: 1024px) {
  .dashboard {
    flex-direction: column;
  }

  .dashboard-menu {
    width: 100%;
    height: auto;
    position: relative;
  }

  .dashboard-container {
    padding: 30px 20px;
  }

  .filtros-jugadores {
    flex-direction: column;
    align-items: stretch;
  }

  .jugadors {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .jugador-info {
    max-width: 320px;
  }

  .camiseta-jugador {
    width: 100%;
    max-width: 300px;
  }
}

/* Móviles - pantallas pequeñas (menos de 768px) */
@media (max-width: 768px) {
  .dashboard-container {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5%;
  }

  .titulo {
    font-size: 1.6rem;
    text-align: center;
  }

  .rol-badge {
    margin: 0 auto;
    font-size: 0.85rem;
  }

  .filtros-jugadores {
    flex-direction: column;
    width: 100%;
  }

  .filtros-jugadores input,
  .filtros-jugadores select {
    width: 100%;
  }

  .jugadors {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .camiseta-jugador {
    width: 90%;
    max-width: 280px;
  }

  .jugador-info input,
  .jugador-info select {
    width: 100%;
  }

  .dashboard-container {
    padding: 20px;
  }

  .popup-content {
    width: 90%;
  }

  .botones {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-guardar,
  .btn-cancelar,
  .btn-eliminar {
    flex: 1 1 auto;
    margin: 5px;
  }
}

</style>
