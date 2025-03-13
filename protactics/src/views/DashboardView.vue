<script setup>
import { ref, onMounted } from 'vue';  
import Posts from "@/components/PostsDashboard.vue";
import UserStats from "@/components/UserStats.vue";
import LastTraining from "@/components/LastTraining.vue";
import Motivation from "@/components/Motivation.vue"; 
import MenuDashboard from '@/components/MenuDashboard.vue';
import axios from "axios"; 


const isLoading = ref(true); // Per controlar si el contingut s'està carregant

// Funció per carregar les dades inicials
const loadDashboardData = async () => {
  try {
    // Cridem a l'API real per carregar les dades de l'usuari
    await axios.get('https://protactics-api.onrender.com/user_stats/monthly_goal');  // Endpoint real per obtenir l'objectiu mensual
    isLoading.value = false;
  } catch (error) {
    console.error('Error carregant dades:', error);
    isLoading.value = false; // Acaba la càrrega fins i tot si hi ha un error
  }
};

onMounted(loadDashboardData);  // Carregar dades en muntar el component

</script>

<template>
  <div class="dashboard">
    <!-- Menú a la izquierda -->
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>

    <!-- Contenedor principal del dashboard -->
    <div class="dashboard-container">
      <div class="dashboard-top">
        <div>
          <h2>Bienvenido, Alex</h2>
          <!-- Sección izquierda: Posts -->
          <div class="dashboard-left">
            <Posts mode="dashboard" />
          </div>
        </div>

        <!-- Sección derecha: Estadísticas del usuario -->
        <div class="dashboard-right">
          <UserStats />
          <LastTraining />
          <Motivation />
        </div>
      </div>

      <!-- Parte inferior: Último entrenamiento y Motivación -->

    </div>

    <!-- Loader para mostrar durante la carga -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Carregant...</p>
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
  /* Asegura que el dashboard ocupe toda la pantalla */
  background-color: #f3f3f3;
}

/* ===== Menú a la izquierda ===== */
.dashboard-menu {
  width: 250px;
  /* Ajusta el tamaño del menú */
  height: 100vh;
  /* Ocupa toda la altura de la pantalla */
  background-color: rgb(36, 36, 36);
  color: white;
  position: fixed;
  /* Mantener fijo al hacer scroll */
  left: 0;
  top: 0;
  bottom: 0;
}

/* ===== Contenedor principal del dashboard ===== */
.dashboard-container {
  flex: 1;
  /* Ocupa el resto del espacio disponible */
  margin-left: 250px;
  /* Evita que el contenido se superponga con el menú */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===== Parte superior (Posts + Stats) ===== */
.dashboard-top {
  display: flex;
}

/* Izquierda: Posts */
.dashboard-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 750px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 3%;

}

/* Derecha: Stats */
.dashboard-right {
  margin-left: 10%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Estilo para los títulos */
h2 {
  text-align: center;
  font-size: 250%;
  font-weight: 500;
  color: rgb(73, 73, 73);
  margin-top: 5%;
}

/* ===== Loader ===== */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #00c3ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

/* Estilo para navegadores basados en WebKit (Chrome, Edge, Safari) */
.dashboard-left::-webkit-scrollbar {
  width: 4px;
  /* Ancho de la barra de scroll */
}

.dashboard-left::-webkit-scrollbar-track {
  background: #f3f3f3;
  /* Color de fondo de la pista del scroll */
  border-radius: 10px;
}

.dashboard-left::-webkit-scrollbar-thumb {
  background: #bbbbbb79;
  /* Color del "pulgar" del scroll */
  border-radius: 10px;
}



@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* ===== Responsividad para pantallas pequeñas ===== */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .dashboard-menu {
    width: 100%;
    height: auto;
    position: relative;
  }

  .dashboard-container {
    margin-left: 0;
  }

  .dashboard-top {
    flex-direction: column;
  }

  .dashboard-down {
    flex-direction: column;
  }
}
</style>
