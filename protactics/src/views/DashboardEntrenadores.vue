<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <ButtonAtras />
      <h2 class="titulo">Gestión de entrenadores</h2>
      <div class="rol-badge">Accediendo como <strong>{{ user.rol }}</strong></div>

      <ButtonCrearEntrenador />

      <div class="entrenadores-lista">
        <h3>Entrenadores del club:</h3>
        <div class="filtros-entrenadores">
          <input v-model="filtroNombre" placeholder="Filtrar por nombre" />
          <input v-model="filtroCorreo" placeholder="Filtrar por correo" />
        </div>

        <div v-if="entrenadores.length === 0" class="empty-msg">Todavía no hay entrenadores creados.</div>

        <div class="entrenadores-grid">
          <div v-for="e in entrenadoresFiltrados" :key="e.entrenador_id" class="entrenador-card">
            <div v-if="entrenadorEditando !== e.entrenador_id" class="entrenador-info">
              <div class="entrenador-content" @click="iniciarEdicion(e)">
                <strong class="nombre">{{ e.nombre }}</strong>
                <p class="correo">{{ e.correo }}</p>
              </div>
              <button class="btn-delete" @click="confirmarEliminarEntrenador(e.entrenador_id)">
                <img src="../assets/img/cruzar.png" />
              </button>
            </div>

            <div v-else class="entrenador-info editando">
              <input v-model="editData.nombre" placeholder="Nombre" />
              <input v-model="editData.correo" placeholder="Correo" />
              <div class="botones">
                <button class="btn-guardar" @click="guardarEdicion(e.entrenador_id)">
                  <img src="../assets/img/guardar.png" class="imgOptions" />
                </button>
                <button class="btn-cancelar" @click="cancelarEdicion()">
                  <img src="../assets/img/izquierda.png" class="imgOptions" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="popupEliminar" class="popup-eliminar">
      <div class="popup-content">
        <h3>¿Eliminar este entrenador?</h3>
        <div class="popup-botones">
          <button @click="eliminarEntrenador">Sí</button>
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
import ButtonAtras from '@/components/botones/ButtonAtras.vue';
import ButtonCrearEntrenador from '@/components/botones/ButtonCrearEntrenador.vue';

const entrenadores = ref([]);
const filtroNombre = ref('');
const filtroCorreo = ref('');

const entrenadorEditando = ref(null);
const editData = ref({ nombre: '', correo: '' });
const popupEliminar = ref(false);
const entrenadorEliminarId = ref(null);

const user = ref({
  id: localStorage.getItem("userId"),
  rol: localStorage.getItem("userRol")
});

const entrenadoresFiltrados = computed(() => {
  return entrenadores.value.filter(e => {
    const nombreOk = e.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase());
    const correoOk = filtroCorreo.value === '' || e.correo.toLowerCase().includes(filtroCorreo.value.toLowerCase());
    return nombreOk && correoOk;
  });
});

const cargarEntrenadores = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get("https://protactics-api.onrender.com/entrenadores", {
      headers: { Authorization: `Bearer ${token}` }
    });
    entrenadores.value = res.data || [];
  } catch (error) {
    console.error("❌ Error al cargar entrenadores:", error);
  }
};

const iniciarEdicion = (entrenador) => {
  entrenadorEditando.value = entrenador.entrenador_id;
  editData.value = { nombre: entrenador.nombre, correo: entrenador.correo };
};

const cancelarEdicion = () => {
  entrenadorEditando.value = null;
  editData.value = { nombre: '', correo: '' };
};

const guardarEdicion = async (id) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.put(`https://protactics-api.onrender.com/entrenadores/${id}`, editData.value, {
      headers: { Authorization: `Bearer ${token}` }
    });
    entrenadorEditando.value = null;
    await cargarEntrenadores();
  } catch (error) {
    console.error("❌ Error actualizando entrenador:", error);
  }
};

const confirmarEliminarEntrenador = (id) => {
  entrenadorEliminarId.value = id;
  popupEliminar.value = true;
};

const cancelarEliminar = () => {
  popupEliminar.value = false;
  entrenadorEliminarId.value = null;
};

const eliminarEntrenador = async () => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`https://protactics-api.onrender.com/entrenadores/${entrenadorEliminarId.value}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    entrenadores.value = entrenadores.value.filter(e => e.entrenador_id !== entrenadorEliminarId.value);
    popupEliminar.value = false;
  } catch (error) {
    console.error("❌ Error eliminando entrenador:", error);
  }
};

onMounted(cargarEntrenadores);
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
  text-transform: uppercase;
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
  margin-top: 4%;
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
  background-color: transparent;
}

.btn-cancelar {
  background-color: transparent;
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

.imgOptions {
  width: 20px;
  height: 20px;
}

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
  width: 20%;
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

.filtros-entrenadores {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 35%;
}

.entrenadores-grid{
  display: flex;
  gap: 20px;
  margin-top: 3%;
}

.entrenador-card{
  background-color: #1e293b;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.entrenador-info{
  display: flex;
  padding: 2%;
}

.entrenador-info.editando input{
  margin: 2px;
}

.entrenadores-lista{
  margin-top: 1%;
}
</style>