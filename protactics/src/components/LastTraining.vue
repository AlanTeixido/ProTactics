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
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    errorMessage.value = "⚠️ No tens permís per veure aquesta informació. Inicia sessió.";
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get("https://protactics-api.onrender.com/entrenamientos/last", {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    training.value = response.data;
  } catch (error) {
    console.error("❌ Error carregant l'últim entrenament:", error.message);
    errorMessage.value = "⚠️ No s'ha pogut carregar l'últim entrenament.";
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
  background: rgba(20, 20, 20, 0.9);
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  text-align: left;
}

h3 {
  color: #00e6e6;
  font-size: 18px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.training-card {
  background: rgba(15, 15, 15, 0.95);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.training-card h4 {
  color: #00e6e6;
  font-size: 16px;
  margin-bottom: 8px;
}

p {
  color: #bfbfbf;
  font-size: 13px;
  margin: 5px 0;
}

button {
  background: #00e6e6;
  color: #000;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
}

button:hover {
  background: #00cccc;
}

.error-message {
  color: #ff4c4c;
  font-weight: bold;
}

</style>
