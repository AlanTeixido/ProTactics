<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';
import ButtonCrearEquipo from '@/components/botones/ButtonCrearEquipo.vue';


const equipos = ref([]);
const user = ref({
  id: localStorage.getItem("userId") || "",
  username: localStorage.getItem("username") || "Usuari",
  rol: localStorage.getItem("userRol") || "desconegut",
});

const equipoEditando = ref(null);
const editData = ref({ nombre: '', categoria: '' });
const popupEliminar = ref(false);
const equipoEliminarId = ref(null);

const esClub = computed(() => user.value.rol === 'club');

const cargarEquipos = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`https://protactics-api.onrender.com/equipos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    equipos.value = response.data || [];
  } catch (error) {
    console.error("❌ Error carregant equips:", error);
  }
};

const eliminarEquipo = async () => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`https://protactics-api.onrender.com/equipos/${equipoEliminarId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    equipos.value = equipos.value.filter(e => e.equipo_id !== equipoEliminarId.value);
    popupEliminar.value = false;
  } catch (error) {
    console.error("❌ Error eliminant equip:", error);
  }
};

const iniciarEdicion = (equipo) => {
  equipoEditando.value = equipo.equipo_id;
  editData.value = { nombre: equipo.nombre, categoria: equipo.categoria };
};

const cancelarEdicion = () => {
  equipoEditando.value = null;
  editData.value = { nombre: '', categoria: '' };
};

const guardarEdicion = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.put(`https://protactics-api.onrender.com/equipos/${id}`, editData.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    equipoEditando.value = null;
    await cargarEquipos();
  } catch (error) {
    console.error("❌ Error actualitzant equip:", error);
  }
};

const confirmarEliminarEquipo = (id) => {
  equipoEliminarId.value = id;
  popupEliminar.value = true;
};

const cancelarEliminar = () => {
  popupEliminar.value = false;
  equipoEliminarId.value = null;
};

onMounted(cargarEquipos);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <h2 class="titulo">Gestión de equipos</h2>
      <div class="rol-badge">Accediendo como <strong>{{ user.rol }}</strong></div>

      <ButtonCrearEquipo />


      <div class="equipos-lista">
        <h3>Equipos del club:</h3>
        <div v-if="equipos.length === 0" class="empty-msg">Todavía no hay equipos creados.</div>

        <ul class="equips">
          <li v-for="e in equipos" :key="e.equipo_id" class="equipo">
            <div v-if="equipoEditando !== e.equipo_id" class="equipo-info">
              <div class="equipo-card" @click="iniciarEdicion(e)">
                <strong class="nombre">{{ e.nombre }}</strong>
                <span class="categoria">{{ e.categoria }}</span>
              </div>
              <button class="btn-delete" @click="confirmarEliminarEquipo(e.equipo_id)">🗑️</button>
            </div>

            <div v-else class="equipo-info editando">
              <input v-model="editData.nombre" placeholder="Nom de l'equip" />
              <input v-model="editData.categoria" placeholder="Categoria" />
              <div class="botones">
                <button class="btn-guardar" @click="guardarEdicion(e.equipo_id)">💾</button>
                <button class="btn-cancelar" @click="cancelarEdicion()">X</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="popupEliminar" class="popup-eliminar">
      <div class="popup-content">
        <h3>¿Eliminar este equipo?</h3>
        <div class="popup-botones">
          <button @click="eliminarEquipo">Sí</button>
          <button @click="cancelarEliminar">Cancelar</button>
        </div>
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
  color: white;
  background-color: transparent;
}


.btn-cancelar {
  background-color: transparent;
  color: rgb(255, 255, 255);
  font-weight: 400;
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
</style>
