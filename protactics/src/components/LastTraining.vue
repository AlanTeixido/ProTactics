<template>
  <div class="last-training-container">
    <h3>Últim Entrenament</h3>

    <div v-if="loading">
      <p>Carregant entrenament...</p>
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
  width: 67%;
  background: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 15px;
  text-align: left;
  margin-top: 4%;
}

h3 {
  color: #000000b7;
  font-size: 100%;
  margin-bottom: 15px;
  text-transform: uppercase;
  text-align: center;
}

.training-card {
  text-align: center;
  background: rgba(207, 207, 207, 0.274);
  padding: 15px;
  border-radius: 10px;
}

.training-card h4 {
  color: #000000ad;
  font-size: 100%;
  margin-bottom: 8px;
}

p {
  color: #00000077;
  font-size: 80%;
  margin: 5px 0;
}

button {
  width: 80%;
  background: #00e6e6;
  color: #000;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease;
}

button:hover {
  background: #00cccc;
}

.error-message {
  color: #ff4c4c;
}

</style>
