<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonCrearJugador from '@/components/botones/ButtonCrearJugador.vue';

const jugadores = ref([]);
const user = ref({
  id: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "Usuari",
  rol: localStorage.getItem("userRol") || "desconegut",
});

const jugadorEditando = ref(null);
const editData = ref({ nombre: '', apellido: '', posicion: '', dorsal: '' });

const esEntrenador = computed(() => user.value.rol === 'entrenador');

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

const eliminarJugador = async (id) => {
  if (!id || !confirm("Segur que vols eliminar aquest jugador?")) return;
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`https://protactics-api.onrender.com/jugadores/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    jugadores.value = jugadores.value.filter(j => j.jugador_id !== id);
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
  editData.value = { nombre: '', apellido: '', posicion: '', dorsal: '' };
};

const guardarEdicion = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.put(`https://protactics-api.onrender.com/jugadores/${id}`, editData.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    jugadorEditando.value = null;
    await cargarJugadores(); // refresquem
  } catch (error) {
    console.error("❌ Error actualitzant jugador:", error);
    alert("No s'ha pogut actualitzar el jugador.");
  }
};

onMounted(cargarJugadores);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <h2 class="titulo">Gestión de jugadores</h2>
      <div class="rol-badge">Accediendo como <strong>{{ user.rol }}</strong></div>

      <div class="crear-jugador-box">
        <ButtonCrearJugador />
      </div>

      <div class="jugadors-llista">
        <h3>Jugadores de tu equipo:</h3>
        <div v-if="jugadores.length === 0" class="empty-msg">
          Todavía no has registrado jugadores.
        </div>

        <ul class="jugadors">
          <li v-for="j in jugadores" :key="j.jugador_id" class="jugador">
            <div v-if="jugadorEditando !== j.jugador_id" class="jugador-info">
              <div class="camiseta-jugador">
                <strong class="nombre">{{ j.nombre }} {{ j.apellido }}</strong>
                <span class="dorsal">{{ j.dorsal }}</span>
              </div>

              <!--
              <div class="botones">
                <button class="btn-edit" @click="iniciarEdicion(j)">✏️</button>
                <button class="btn-delete" @click="eliminarJugador(j.jugador_id)">🗑️</button>
              </div>
              -->
            </div>

            <div v-else class="jugador-info editando">
              <input v-model="editData.nombre" placeholder="Nom" />
              <input v-model="editData.apellido" placeholder="Cognom" />
              <input v-model="editData.posicion" placeholder="Posició" />
              <input v-model="editData.dorsal" type="number" placeholder="Dorsal" />
              <div class="botones">
                <button class="btn-guardar" @click="guardarEdicion(j.jugador_id)">💾</button>
                <button class="btn-cancelar" @click="cancelarEdicion()">❌</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: rgb(36, 36, 36);
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
  font-size: 2.4rem;
  font-weight: 600;
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
  margin-top: 10px;
  margin-bottom: 30px;
  width: fit-content;
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
  display: flex;
  gap: 45px;
}

.camiseta-jugador:hover {
  cursor: pointer;
  transform: scale(1.1);

}
.jugador-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.jugador-info.editando {
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
  background: #22c55e;
  color: white;
}

.btn-guardar:hover {
  background: #16a34a;
}

.btn-cancelar {
  background: #9ca3af;
  color: black;
}

.btn-cancelar:hover {
  background: #6b7280;
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
.nombre{
  font-size: 108%;
  font-weight: 400;
}
.dorsal{
  font-size: 300%;
  font-weight: 600;
}
</style>
