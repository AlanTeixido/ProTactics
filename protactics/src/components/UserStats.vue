<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userStats = ref(null);
const loading = ref(true);
const errorMessage = ref(""); // Per mostrar errors a la UI

// 🔹 Funció per carregar les estadístiques generals dels entrenaments
const loadUserStats = async () => {
  try {
    const response = await axios.get("https://protactics-api.onrender.com/user_stats/public");

    if (!response.data || Object.keys(response.data).length === 0) {
      errorMessage.value = "ℹ️ No hi ha dades disponibles.";
      userStats.value = null;
      return;
    }

    // 🔹 Formatem el temps total correctament
    const stats = response.data;
    stats.total_time = formatTime(stats.total_time);

    userStats.value = stats;
  } catch (error) {
    console.error("❌ Error carregant estadístiques:", error);
    errorMessage.value = "❌ No s'han pogut obtenir les estadístiques.";
    userStats.value = null;
  } finally {
    loading.value = false;
  }
};

// 🔹 Funció per formatar el temps en hores i minuts correctament
const formatTime = (timeString) => {
  if (!timeString || typeof timeString !== "string") return "0h 0m";
  
  const timeParts = timeString.split(" ");
  const hours = parseInt(timeParts[0]) || 0;
  const minutes = parseInt(timeParts[1]) || 0;
  
  return `${hours}h ${minutes}m`;
};

// 🔹 Executa la funció en carregar el component
onMounted(loadUserStats);
</script>

<template>
  <div class="user-stats">
    <h3>📊 Estadístiques Generals</h3>

    <div v-if="loading">
      <p>🔄 Carregant estadístiques...</p>
    </div>

    <div v-else-if="errorMessage">
      <p class="error-message">{{ errorMessage }}</p>
    </div>

    <div v-else-if="userStats" class="stats-content">
      <p><strong>🏋️‍♂️ Entrenaments totals:</strong> {{ userStats.total_trainings }}</p>
      <p><strong>⏳ Temps total:</strong> {{ userStats.total_time }}</p>
      <p><strong>🔥 Calories cremades:</strong> {{ userStats.total_calories }}</p>
      <p><strong>⚡ Rendiment mitjà:</strong> {{ userStats.avg_performance }} %</p> 
    </div>
  </div>
</template>

<style scoped>
.user-stats {
  background: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 5px 15px rgba(0, 255, 255, 0.2);
}

h3 {
  font-size: 20px;
  font-weight: bold;
  color: #00c3ff;
  margin-bottom: 10px;
}

.stats-content {
  font-size: 14px;
  color: #ccc;
}

.error-message {
  color: #ff3b30;
  font-size: 14px;
  font-weight: bold;
}
</style>
