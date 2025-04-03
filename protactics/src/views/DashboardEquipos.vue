<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <h2 class="titulo">Gestión de equipos</h2>
      <div class="rol-badge">Accediendo como <strong>{{ user.rol }}</strong></div>

      <ButtonCrearEquipo />

      <div class="filtros-equipos">
        <input v-model="filtroNombre" placeholder="Filtrar por nombre" />
        <input v-model="filtroCategoria" placeholder="Filtrar por categoría" />
      </div>
      

      <div class="equipos-lista">
        <h3>Equipos del club:</h3>
        <div v-if="equipos.length === 0" class="empty-msg">Todavía no hay equipos creados.</div>

        <div class="equips-grid">
          <div v-for="e in equiposFiltrados":key="e.equipo_id" class="equipo-card">
            <div v-if="equipoEditando !== e.equipo_id" class="equipo-info">
              <div class="equipo-content" @click="iniciarEdicion(e)">
                <strong class="nombre">{{ e.nombre }}</strong>
              </div>
              <button class="btn-delete" @click="confirmarEliminarEquipo(e.equipo_id)"><img
                  src="../assets/img/cruzar.png"></button>
            </div>

            <div v-else class="equipo-info editando">
              <input v-model="editData.nombre" placeholder="Nom de l'equip" />
              <select v-model="editData.categoria" class="select-categoria">
                <option disabled value="">Selecciona una categoría</option>
                <option value="Prebenjamín">Prebenjamín</option>
                <option value="Benjamín">Benjamín</option>
                <option value="Alevín">Alevín</option>
                <option value="Infantil">Infantil</option>
                <option value="Cadete">Cadete</option>
                <option value="Juvenil">Juvenil</option>
                <option value="Amateur">Amateur</option>
                <option value="Senior">Senior</option>
                <option value="Femenino">Femenino</option>
                <option value="Veteranos">Veteranos</option>
                <option value="Fútbol Sala">Fútbol Sala</option>
                <option value="Tecnificación">Tecnificación</option>
                <option value="Competición">Competición</option>
              </select>              
                <div class="botones">
                <button class="btn-guardar" @click="guardarEdicion(e.equipo_id)">💾</button>
                <button class="btn-cancelar" @click="cancelarEdicion()">X</button>
              </div>
            </div>
          </div>
        </div>
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

const filtroNombre = ref('');
const filtroCategoria = ref('');

const equiposFiltrados = computed(() => {
  return equipos.value.filter(e => {
    const nombreOk = e.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase());
    const categoriaOk = filtroCategoria.value === '' || e.categoria.toLowerCase().includes(filtroCategoria.value.toLowerCase());
    return nombreOk && categoriaOk;
  });
});


const equipoEditando = ref(null);
const editData = ref({ nombre: '', categoria: '' });
const popupEliminar = ref(false);
const equipoEliminarId = ref(null);

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

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  background-color: #1f2937;
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
}

.rol-badge {
  background-color: #334155;
  padding: 8px 18px;
  border-radius: 25px;
  font-size: 0.95rem;
  width: fit-content;
  color: #e2e8f0;
}

.equipos-lista h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
}

.empty-msg {
  color: #94a3b8;
  font-style: italic;
  margin-top: 10px;
}

.equips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.equipo-card {
  background-color: #1e293b;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s;
  position: relative;
}

.equipo-card:hover {
  transform: scale(1.03);
}

.equipo-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.equipo-info.editando {
  flex-direction: column;
  gap: 10px;
}

.equipo-content {
  flex-grow: 1;
  cursor: pointer;
}

.nombre {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e0f2fe;
}

.categoria {
  font-size: 0.95rem;
  color: #38bdf8;
}

input {
  background-color: #334155;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  width: 100%;
}

.botones {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-guardar,
.btn-cancelar {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
}

.btn-guardar {
  background-color: #22c55e;
  color: white;
}

.btn-cancelar {
  background-color: #ef4444;
  color: white;
}

.btn-delete {
  color: white;
  background-color: transparent;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.btn-delete img {
  width: 20px;
  height: 20px;
}

.btn-delete:hover {}

.popup-eliminar {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: #1e293b;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  color: white;
  max-width: 400px;
}

.popup-botones {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.popup-botones button {
  padding: 10px 20px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.popup-botones button:first-child {
  background-color: #ef4444;
  color: white;
}

.popup-botones button:last-child {
  background-color: #334155;
  color: white;
}

.filtros-equipos {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.filtros-equipos input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  background-color: #334155;
  color: white;
  font-size: 0.95rem;
}

.select-categoria {
  background-color: #334155;
  color: white;
  padding: 10px;
  border-radius: 6px;
  border: none;
  font-size: 0.95rem;
  width: 100%;
}



</style>