<template>
  <div class="entrenamientos-container">
    <div v-if="loading">
      <p>Cargando entrenamientos...</p>
    </div>

    <div v-else-if="entrenamientos.length" class="entrenamientos-list">
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
  width: 90%;
  margin: 50px auto;
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

/* 🔹 Grid mejorado para mostrar entrenamientos en filas de 3 */
.entrenamientos-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;  /* Más separación entre entrenamientos */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.entrenamiento-card {
  background: rgba(255, 255, 255, 0.08);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 6px solid #00c3ff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.entrenamiento-card:hover {
  transform: translateY(-3px);
  box-shadow: 0px 6px 20px rgba(0, 255, 255, 0.4);
}

.entrenamiento-card h3 {
  font-size: 20px;
  font-weight: bold;
  color: #00c3ff;
  margin-bottom: 10px;
}

.entrenamiento-card p {
  font-size: 16px;
  color: #e0e0e0;
  margin: 8px 0;
  text-align: left;
}

/* 🔹 Contenedor de botones con flexbox */
.actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}

.actions button {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  border: none;
  font-weight: bold;
}

.edit-btn {
  background-color: #00c3ff;
  color: white;
}

.edit-btn:hover {
  background-color: #0099cc;
}

.delete-btn {
  background-color: #ff3b30;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
/* 🔹 Contenedor de la barra superior */
.top-bar {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

/* 🔹 Estilo mejorado del botón "Volver al Dashboard" */
.back-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.back-btn:hover {
  background-color: #3e8e41;
}

/* 🔹 Mejor distribución de entrenamientos en filas de 3 */
.entrenamientos-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  gap: 25px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 🔹 Responsive para pantallas medianas y móviles */
@media (max-width: 1024px) {
  .entrenamientos-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .entrenamientos-list {
    grid-template-columns: repeat(1, 1fr);
  }
}


.back-btn:hover {
  background-color: #3e8e41;
}

/* 🔹 Responsive: Ajustar el número de columnas en pantallas más pequeñas */
@media (max-width: 1024px) {
  .entrenamientos-list {
    grid-template-columns: repeat(2, 1fr); /* Mostrar 2 entrenamientos por fila en pantallas medianas */
  }
}

@media (max-width: 768px) {
  .entrenamientos-list {
    grid-template-columns: repeat(1, 1fr); /* Mostrar 1 entrenamiento por fila en móviles */
  }
}

</style>
