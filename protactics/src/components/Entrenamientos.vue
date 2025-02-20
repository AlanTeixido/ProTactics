<template>
  <div class="entrenamientos-container">
    <h2>Mis Entrenamientos</h2>

    <div v-if="loading">
      <p>🔄 Cargando entrenamientos...</p>
    </div>

    <div v-else-if="entrenamientos.length">
      <div v-for="entrenamiento in entrenamientos" :key="entrenamiento.id" class="entrenamiento-card">
        <h3>{{ entrenamiento.titulo }}</h3>
        <p><strong>Deporte:</strong> {{ entrenamiento.tipo_deporte }}</p>
        <p><strong>Duración:</strong> {{ formatDuracion(entrenamiento.duracion) }}</p>
        <p><strong>Descripción:</strong> {{ entrenamiento.descripcion || 'Sin descripción' }}</p>
        <p><strong>Visibilidad:</strong> {{ entrenamiento.visibilidad }}</p>
        <p><strong>Distancia:</strong> {{ entrenamiento.distancia || 'N/A' }} km</p>
        <p><strong>Calorías Quemadas:</strong> {{ entrenamiento.calorias_quemadas || 'N/A' }} kcal</p>
        <p><strong>Inicio:</strong> {{ formatFecha(entrenamiento.inicio) }}</p>
        <p><strong>Fin:</strong> {{ entrenamiento.fin ? formatFecha(entrenamiento.fin) : 'En progreso' }}</p>

        <!-- 🔹 Verifica si detalles existen y son del deporte correcto -->
        <template v-if="entrenamiento.detalles && Object.keys(entrenamiento.detalles).length > 0">
          <template v-if="entrenamiento.tipo_deporte === 'piscina'">
            <p><strong>Número de Piscinas:</strong> {{ entrenamiento.detalles.num_piscinas || 'N/A' }}</p>
            <p><strong>Tamaño de Piscina:</strong> {{ entrenamiento.detalles.tamano_piscina || 'N/A' }}</p>
            <p><strong>Estilo:</strong> {{ entrenamiento.detalles.estilo || 'N/A' }}</p>
          </template>

          <template v-else-if="entrenamiento.tipo_deporte === 'futbol'">
            <p><strong>Tipo de Entrenamiento:</strong> {{ entrenamiento.detalles.tipo || 'N/A' }}</p>
            <p><strong>Posición Jugada:</strong> {{ entrenamiento.detalles.posicion || 'N/A' }}</p>
            <p><strong>Goles:</strong> {{ entrenamiento.detalles.goles || 0 }}</p>
            <p><strong>Asistencias:</strong> {{ entrenamiento.detalles.asistencias || 0 }}</p>
          </template>

          <template v-else-if="entrenamiento.tipo_deporte === 'ciclismo'">
            <p><strong>Potencia Media:</strong> {{ entrenamiento.detalles.potencia_media || 'N/A' }} W</p>
            <p><strong>Cadencia:</strong> {{ entrenamiento.detalles.cadencia || 'N/A' }} rpm</p>
            <p><strong>Velocidad Máxima:</strong> {{ entrenamiento.detalles.velocidad_maxima || 'N/A' }} km/h</p>
          </template>
        </template>

        <div class="actions">
          <button @click="$router.push(`/editar-entrenamiento/${entrenamiento.id}`)">✏️ Editar</button>
          <button @click="eliminarEntrenamiento(entrenamiento.id)" class="delete-btn">🗑 Eliminar</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="no-data">No tienes entrenamientos creados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const userId = localStorage.getItem('userId');
const entrenamientos = ref([]);
const loading = ref(true);

// 🔹 Formatear fecha a formato más legible
const formatFecha = (fecha) => new Date(fecha).toLocaleString();

// 🔹 Formatear la duración correctamente
const formatDuracion = (duracion) => {
  if (!duracion) return "N/A";
  if (typeof duracion === "object" && duracion.minutes !== undefined) {
    return `${duracion.minutes}m`;
  }
  return duracion;
};

// 🔹 Cargar entrenamientos del usuario autenticado
const loadEntrenamientos = async () => {
  if (!userId) return;

  try {
    const response = await axios.get(`https://protactics-api.onrender.com/entrenamientos/user/${userId}`);
    entrenamientos.value = response.data;
  } catch (error) {
    console.error("❌ Error cargando entrenamientos:", error);
  } finally {
    loading.value = false;
  }
};

// 🔹 Función para eliminar entrenamiento
const eliminarEntrenamiento = async (id) => {
  if (!confirm("¿Seguro que quieres eliminar este entrenamiento?")) return;

  try {
    await axios.delete(`https://protactics-api.onrender.com/entrenamientos/${id}`);
    entrenamientos.value = entrenamientos.value.filter(e => e.id !== id);
  } catch (error) {
    console.error("❌ Error eliminando entrenamiento:", error);
  }
};

onMounted(loadEntrenamientos);
</script>




<style scoped>
.entrenamientos-container {
  width: 85%;
  margin: 50px auto;
  margin-top: 10%;
  padding: 30px;
  text-align: center;
  background: #121212;
  border-radius: 15px;
  box-shadow: 0px 5px 20px rgba(0, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 32px;
  color: #00c3ff;
  font-weight: bold;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.entrenamiento-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0px 5px 15px rgba(0, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 6px solid #00c3ff;
}

.entrenamiento-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 6px 20px rgba(0, 255, 255, 0.3);
}

.entrenamiento-card p {
  font-size: 18px;
  color: #e0e0e0;
  margin: 10px 0;
  text-align: left;
}

.actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.delete-btn {
  background-color: #ff3b30;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
