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
/* 🔹 Contenedor principal de entrenamientos */
.entrenamientos-container {
  width: 85%;
  margin: 50px auto;
  margin-top: 10%;
  padding: 30px;
  text-align: center;
  background: #121212; /* Fondo oscuro moderno */
  border-radius: 15px;
  box-shadow: 0px 5px 20px rgba(0, 255, 255, 0.15); /* Brillo sutil */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 🔹 Título */
h2 {
  font-size: 32px;
  color: #00c3ff; /* Azul vibrante de la web */
  font-weight: bold;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* 🔹 Tarjetas de entrenamiento */
.entrenamiento-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0px 5px 15px rgba(0, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 6px solid #00c3ff; /* Azul lateral para destacar */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.entrenamiento-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 6px 20px rgba(0, 255, 255, 0.3);
}

/* 🔹 Información del entrenamiento */
.entrenamiento-card p {
  font-size: 18px;
  color: #e0e0e0;
  margin: 10px 0;
  text-align: left;
}

.entrenamiento-card strong {
  color: #00c3ff;
  font-weight: bold;
}

/* 🔹 Botones de acción */
.actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Botón Editar */
.actions button {
  background-color: #00c3ff;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;
}

.actions button:hover {
  background-color: #0099cc;
  transform: scale(1.05);
}

/* Botón Eliminar */
.delete-btn {
  background-color: #ff3b30;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

/* 🔹 No hay entrenamientos */
p.no-data {
  font-size: 20px;
  color: #00c3ff;
  font-weight: bold;
  margin-top: 30px;
}

/* 🔹 Ajustes generales para mejorar la legibilidad */
@media (max-width: 768px) {
  .entrenamientos-container {
    width: 95%;
    padding: 20px;
  }

  .entrenamiento-card {
    width: 100%;
  }

  .actions {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
