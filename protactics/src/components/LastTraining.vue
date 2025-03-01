<template>
  <div class="last-training-container">
    <h3>Últim Entrenament</h3>

    <div v-if="loading">
      <p>🔄 Carregant entrenament...</p>
    </div>

    <div v-else-if="errorMessage">
      <p class="error-message">{{ errorMessage }}</p>
    </div>

    <div v-else-if="training" class="training-card">
      <h4>{{ training.titulo }}</h4>
      <p class="training-description">{{ training.descripcion || "Sense descripció" }}</p>
      <p><strong>Esport:</strong> {{ training.tipo_deporte }}</p>
      <p><strong>Duració:</strong> {{ formatDuracion(training.duracion) }}</p>

      <button @click="goToTrainings" class="view-all-btn">Veure tots els entrenaments</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const training = ref(null);
const loading = ref(true);
const errorMessage = ref("");
const router = useRouter();

// 🔹 Funció per carregar l'últim entrenament
const loadLastTraining = async () => {
  try {
    const response = await axios.get("https://protactics-api.onrender.com/entrenamientos/last");
    training.value = response.data;
  } catch (error) {
    console.error("❌ Error carregant l'últim entrenament:", error);
    errorMessage.value = "No s'ha pogut carregar l'últim entrenament.";
  } finally {
    loading.value = false;
  }
};

// 🔹 Funció per formatar la duració correctament
const formatDuracion = (duracion) => {
  if (!duracion) return "N/A";
  if (duracion.minutes !== undefined) return `${duracion.minutes} min`;
  return duracion;
};

// 🔹 Funció per anar a la pàgina d'entrenaments
const goToTrainings = () => {
  router.push("/mis-entrenamientos");
};

onMounted(loadLastTraining);
</script>

<style scoped>
.last-training-container {
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

.training-card {
  background: rgba(255, 255, 255, 0.08);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 255, 255, 0.2);
}

h4 {
  font-size: 18px;
  color: #00c3ff;
  margin-bottom: 8px;
}

.training-description {
  font-size: 14px;
  color: #e0e0e0;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #ccc;
  margin: 5px 0;
}

.view-all-btn {
  margin-top: 10px;
  background: #00c3ff;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.view-all-btn:hover {
  background: #0099cc;
}

.error-message {
  color: #ff3b30;
  font-size: 14px;
  font-weight: bold;
}
</style>
