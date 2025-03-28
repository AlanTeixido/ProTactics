<script setup>
import { ref, computed, onMounted } from 'vue';  
import Posts from "@/components/PostsDashboard.vue";
import MenuDashboard from '@/components/MenuDashboard.vue';
import axios from "axios";
import Loader from "@/components/Loader.vue"; 
import ButtonCrearTarea from '@/components/botones/ButtonCrearTarea.vue';
import CrearEntrenador from '@/components/formularios/FormCrearEntrenador.vue';
import ButtonCrearEntrenador from '@/components/botones/ButtonCrearEntrenador.vue';
import ButtonCrearJugador from '@/components/botones/ButtonCrearJugador.vue';  // Botón para crear jugador

// Loading
const isLoading = ref(true);

// Usuari i rol
const user = ref({
  username: localStorage.getItem("username") || "Usuario",
  rol: localStorage.getItem("userRol") || "desconocido"
});

const esClub = computed(() => user.value.rol === 'club');
const esEntrenador = computed(() => user.value.rol === 'entrenador');

// Cargar datos iniciales
const loadDashboardData = async () => {
  try {
    await axios.get('https://protactics-api.onrender.com/user_stats/monthly_goal');
  } catch (error) {
    console.error('Error cargando datos:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadDashboardData);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <div class="dashboard-container">
      <div class="dashboard-top">
        <div>
          <h2>Bienvenido, {{ user.username }}</h2>

          <div v-if="esClub" class="dashboard-left">
            <Posts mode="dashboard" />
            <p style="margin: 20px; color: #4a4a4a;">Accediendo como <strong>Club</strong></p>
            
            <!-- Botón para crear entrenador -->
            <ButtonCrearEntrenador />
          </div>

          <div v-else-if="esEntrenador" class="dashboard-left">
            <Posts mode="dashboard" />
            <p style="margin: 20px; color: #4a4a4a;">Accediendo como <strong>Entrenador</strong></p>
            
            <!-- Botón para crear jugador, visible solo para entrenadores -->
            <ButtonCrearJugador />  <
          </div>

          <div v-else class="dashboard-left">
            <p>No se ha podido identificar el rol.</p>
          </div>
        </div>

        <div class="dashboard-right">
          <!-- Puedes agregar más contenido aquí -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos generales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f3f3f3;
}

.dashboard {
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
}

/* ===== Menú a la izquierda ===== */
.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: rgb(36, 36, 36);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

/* ===== Contenedor principal del dashboard ===== */
.dashboard-container {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===== Parte superior (Posts + Stats) ===== */
.dashboard-top {
  display: flex;
}

.dashboard-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 750px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 3%;
}

.dashboard-right {
  margin-left: 10%;
  flex: 1;
}

h2 {
  text-align: center;
  font-size: 250%;
  font-weight: 500;
  color: rgb(73, 73, 73);
  margin-top: 5%;
}

.loading-text {
  color: #888;
}

.dashboard-left::-webkit-scrollbar {
  width: 4px;
}

.dashboard-left::-webkit-scrollbar-track {
  background: #f3f3f3;
  border-radius: 10px;
}

.dashboard-left::-webkit-scrollbar-thumb {
  background: #bbbbbb79;
  border-radius: 10px;
}

@media (max-width: 1500px) {
  .dashboard-menu {
    width: 200px;
  }

  .dashboard-container {
    margin-left: 200px;
  }
}
</style>
