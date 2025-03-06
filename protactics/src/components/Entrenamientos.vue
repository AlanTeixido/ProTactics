<template>
  <div class="entrenamientos-container">
    <div v-if="loading" class="loading-text">
      <p>Cargando entrenamientos...</p>
    </div>

    <div v-else-if="entrenamientos.length" class="entrenamientos-list">
      <div v-for="entrenamiento in entrenamientos" :key="entrenamiento.id" class="entrenamiento-card">
        <div @click="$router.push(`/editar-entrenamiento/${entrenamiento.id}`)">
          <h3>{{ entrenamiento.titulo }}</h3>
          <h4 class="type-deporte">{{ entrenamiento.tipo_deporte }}</h4>
          <div class="time">
            <p>
              <strong>Duración:</strong> {{ formatDuracion(entrenamiento.duracion) }}
              <br>
              <strong>Inicio:</strong> {{ formatFecha(entrenamiento.inicio) }}
              <br>
              <strong>Fin:</strong> {{ entrenamiento.fin ? formatFecha(entrenamiento.fin) : 'En progreso' }}
            </p>
          </div>
          <p><strong>Visibilidad:</strong> {{ entrenamiento.visibilidad }}</p>
          <p><strong>Distancia:</strong> {{ entrenamiento.distancia || 'N/A' }} km</p>
          <p><strong>Calorías Quemadas:</strong> {{ entrenamiento.calorias_quemadas || 'N/A' }} kcal</p>
          <div class="description">
            <p><strong>Descripción:</strong> {{ entrenamiento.descripcion || 'Sin descripción' }}</p>
          </div>
          
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

        </div>
        <button @click="eliminarEntrenamiento(entrenamiento.id)" class="delete-btn">X</button>
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
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = localStorage.getItem('userId');
const entrenamientos = ref([]);
const loading = ref(true);

// Funcion volver dashboard volverDashboard
const volverDashboard = () => {
  router.push("/dashboard");
};


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
    const authToken = localStorage.getItem("authToken");

    if (!userId) {
        console.error("⚠️ No hay userId guardado.");
        return;
    }

    if (!authToken) {
        console.error("⚠️ No hay authToken guardado.");
        return;
    }

    try {
        const response = await axios.get(`https://protactics-api.onrender.com/entrenamientos/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        entrenamientos.value = response.data;
    } catch (error) {
        console.error("❌ Error cargando entrenamientos:", error.response?.data || error.message);
    } finally {
        loading.value = false;
    }
};

// 🔹 Función para eliminar entrenamiento
const eliminarEntrenamiento = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este entrenamiento?")) return;

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        alert("⚠️ No tienes autorización. Inicia sesión de nuevo.");
        return;
    }

    try {
        await axios.delete(`https://protactics-api.onrender.com/entrenamientos/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        entrenamientos.value = entrenamientos.value.filter(e => e.id !== id);
    } catch (error) {
        console.error("❌ Error eliminando entrenamiento:", error.response?.data || error.message);
        alert("❌ Error eliminando el entrenamiento.");
    }
};


onMounted(loadEntrenamientos);
</script>



<style scoped>
.entrenamientos-container {
  width: 90%;
  margin: 50px auto;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra sutil para profundidad */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333; /* Color de texto oscuro para buen contraste */
}

.entrenamientos-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.entrenamiento-card {
  background: #000000;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); /* Sombra ligera */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.entrenamiento-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra más marcada al hacer hover */
}

.entrenamiento-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #e0e0e0;
  margin-bottom: 15px;
  text-transform: uppercase;
  text-align: left; /* Alineación a la izquierda */
}

.type-deporte {
  font-size: 14px;
  font-weight: 400;
  color: #e0e0e0; /* Color más suave para el tipo de deporte */
  text-transform: uppercase;
  margin-bottom: 15px;
  text-align: left; /* Alineación a la izquierda */
}

.entrenamiento-card p {
  font-size: 14px;
  color: #e0e0e0; /* Texto gris suave */
  margin-bottom: 10px;
  text-align: justify; /* Justificado */
  text-justify: inter-word; /* Mejora la justificación */
}

.entrenamiento-card .time {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.time-column {
  flex: 1;
}

.hora-column {
  flex: 1;
  text-align: right;
}

.delete-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ff4d4d;
  color: #fff;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 15px;
  align-self: flex-start;
}

.delete-btn:hover {
  background-color: #e04343;
}

/* 🔹 Estilo para el botón de "Volver al Dashboard" */
.back-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 30px;
}

.back-btn:hover {
  background-color: #45a049;
}

.loading-text {
  color: #888;
}

/* 🔹 Ajustes para pantallas medianas y móviles */
@media (max-width: 1024px) {
  .entrenamientos-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .entrenamientos-list {
    grid-template-columns: 1fr;
  }

  .back-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>

