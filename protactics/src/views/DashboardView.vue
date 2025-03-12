<script setup>
import { ref, onMounted } from 'vue';  // Importa correctament `ref` i `onMounted`
import Posts from "@/components/Posts.vue";
import UserStats from "@/components/UserStats.vue";
import LastTraining from "@/components/LastTraining.vue";
import Motivation from "@/components/Motivation.vue"; // Afegim el component "Motivation"
import MenuDashboard from '@/components/MenuDashboard.vue';

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

  <div class="dashboard-container">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>
    <div class="dashboard-left">
      <h2>Welcome, Alex</h2>
      <Posts mode="dashboard" />
    </div>

    <div class="dashboard-right">
      <UserStats />
      <LastTraining /> <!-- Aquí es manté el component de "Last Training" -->
      <Motivation /> <!-- Afegim "Motivation" per als objectius mensuals -->
    </div>
  </div>
  <!-- Loader per mostrar durant la càrrega de dades -->
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div> <!-- Afegeix el teu spinner aquí -->
    <p>Carregant...</p>
  </div>
</template>

<style scoped>
*{
  margin: 0;
}
h2 {
  text-align: center;
  text-transform: uppercase;
  font-size: 250%;
  font-weight: 550;
  color: rgb(102, 102, 102);
}

.dashboard-container {
  display: flex;
  justify-content: center;
  background-color: #f3f3f3;
  
}

.dashboard-left {
  width: 65%;
  margin-top: 5%;
  margin-left: 15%;
}

.dashboard-right {
  width: 20%;
  flex-direction: column;
  border-radius: 10px;
  padding: 5%;
}

.last-training-container,
.user-stats,
.motivation {
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 10%;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

h3,
h4 {
  font-size: 22px;
  font-weight: 600;
  color: #00c3ff;
}

.view-all-btn {
  margin-top: 10px;
  background: #00c3ff;
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease, transform 0.2s ease;
}

.view-all-btn:hover {
  transform: scale(1.05);
}

/* Responsivitat per pantalles petites */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .dashboard-left,
  .dashboard-right {
    width: 100%;
  }

  .view-all-btn {
    width: 100%;
    margin-top: 15px;
  }
}

/* Estils per al loader */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
