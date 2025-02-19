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
        <p><strong>Duración:</strong> {{ entrenamiento.duracion.hours }}h {{ entrenamiento.duracion.minutes }}m</p>
        <p><strong>Descripción:</strong> {{ entrenamiento.descripcion || 'Sin descripción' }}</p>
        <p><strong>Visibilidad:</strong> {{ entrenamiento.visibilidad }}</p>
        <p><strong>Distancia:</strong> {{ entrenamiento.distancia || 'N/A' }} km</p>
        <p><strong>Desnivel Acumulado:</strong> {{ entrenamiento.desnivel_acumulado || 'N/A' }} m</p>
        <p><strong>Calorías Quemadas:</strong> {{ entrenamiento.calorias_quemadas || 'N/A' }} kcal</p>
        <p><strong>Inicio:</strong> {{ formatFecha(entrenamiento.inicio) }}</p>
        <p><strong>Fin:</strong> {{ entrenamiento.fin ? formatFecha(entrenamiento.fin) : 'En progreso' }}</p>

        <div class="actions">
          <button @click="editarEntrenamiento(entrenamiento.id)">✏️ Editar</button>
          <button @click="eliminarEntrenamiento(entrenamiento.id)" class="delete-btn">🗑 Eliminar</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No tienes entrenamientos creados.</p>
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
const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleString();
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

// 🔹 Función para editar (redirigir al formulario de edición)
const editarEntrenamiento = (id) => {
  window.location.href = `/editar-entrenamiento/${id}`;
};

onMounted(loadEntrenamientos);
</script>

<style scoped>
.entrenamientos-container {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.entrenamiento-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.actions {
  margin-top: 10px;
}

.delete-btn {
  color: red;
  margin-left: 10px;
}
</style>
