<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const userStats = ref(null);
const loading = ref(true);
const errorMessage = ref(""); // Per mostrar errors a la UI

// 🔹 Funció per carregar les estadístiques de l'usuari autenticat
const loadUserStats = async () => {
  const token = localStorage.getItem("authToken"); // 📌 FIX: Ara usa "authToken", que és el que es guarda realment

  if (!token) {
    console.error("🚨 No hi ha token disponible.");
    errorMessage.value = "⚠️ No s'ha trobat cap sessió activa.";
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/user_stats", {
      headers: { Authorization: `Bearer ${token}` },
    });

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

    if (error.response) {
      if (error.response.status === 401) {
        errorMessage.value = "⚠️ La sessió ha expirat. Fes login de nou.";
      } else {
        errorMessage.value = `❌ Error: ${error.response.data.error || "No s'han pogut obtenir les estadístiques."}`;
      }
    } else {
      errorMessage.value = "❌ Error de connexió amb el servidor.";
    }

    userStats.value = null;
  } finally {
    loading.value = false;
  }
};

// 🔹 Funció per formatar el temps en hores i minuts correctament
const formatTime = (timeString) => {
  if (!timeString) return "0h 0m";
  
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
    <h3>📊 Les teves estadístiques</h3>

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
      <p><strong>❤️ Freqüència cardíaca mitjana:</strong> {{ userStats.avg_heart_rate }} bpm</p>
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
