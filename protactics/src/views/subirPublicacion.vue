<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MenuDashboard from '@/components/MenuDashboard.vue';

// Estado para almacenar los entrenamientos del entrenador
const entrenamientos = ref([]);
// Estado para controlar la carga
const loading = ref(true);
// Obtener el ID del entrenador desde localStorage
const entrenadorId = localStorage.getItem('userId');

// Función para obtener los entrenamientos del entrenador
const fetchEntrenamientos = async () => {
  try {
    const response = await axios.get(`https://protactics-api.onrender.com/entrenamientos?entrenador_id=${entrenadorId}`);
    entrenamientos.value = response.data;
  } catch (error) {
    console.error('Error al obtener entrenamientos', error);
  } finally {
    loading.value = false;
  }
};

// Función para publicar un entrenamiento
const publicarEntrenamiento = async (entrenamientoId) => {
  const entrenamiento = entrenamientos.value.find(ent => ent.entrenamiento_id === entrenamientoId);

  if (!entrenamiento) {
    console.error('Entrenamiento no encontrado');
    return;
  }

  const publicacionData = {
    entrenador_id: entrenadorId,
    entrenamiento_id: entrenamientoId,
    titulo: entrenamiento.titulo,
    descripcion: entrenamiento.descripcion,
    categoria: entrenamiento.categoria,
    campo: entrenamiento.campo,
    fecha_entrenamiento: entrenamiento.fecha_entrenamiento,
    duracion_repeticion: entrenamiento.duracion_repeticion,
    repeticiones: entrenamiento.repeticiones,
    total_duracion: entrenamiento.total_duracion,
    descanso: entrenamiento.descanso,
    valoracion: entrenamiento.valoracion,
    imagen_url: entrenamiento.imagen_url,
    notas_adicionales: entrenamiento.notas_adicionales
  };

  try {
    const response = await axios.post('https://protactics-api.onrender.com/publicaciones', publicacionData);
    console.log('Entrenamiento publicado exitosamente:', response.data);
    // Opcional: Mostrar un mensaje de éxito o actualizar la lista de publicaciones
  } catch (error) {
    console.error('Error al publicar el entrenamiento', error);
    // Opcional: Mostrar un mensaje de error al usuario
  }
};

// Obtener los entrenamientos cuando el componente se monta
onMounted(fetchEntrenamientos);
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-menu">
      <MenuDashboard />
    </div>
    <div class="dashboard-container">
      <h1 class="titulo">Mis Entrenamientos</h1>
      <div v-if="loading" class="loading">Cargando entrenamientos...</div>
      <div v-else class="grid">
        <div v-for="entrenamiento in entrenamientos" :key="entrenamiento.entrenamiento_id" class="card">
          <h2 class="entrenamiento-titulo">{{ entrenamiento.titulo }}</h2>
          <p class="entrenamiento-descripcion">{{ entrenamiento.descripcion }}</p>
          <button @click="publicarEntrenamiento(entrenamiento.entrenamiento_id)" class="publicar-button">
            Publicar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: linear-gradient(to left, #0f172a, #155e75);
  color: white;
}

.dashboard-menu {
  width: 250px;
  height: 100vh;
  background-color: rgb(36, 36, 36);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.dashboard-container {
  flex: 1;
  margin-left: 250px;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin-top: 5%;
}

.titulo {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
}

.loading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #facc15;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 900px;
}

.card {
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(to right, #0bd1df, #155e75);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.entrenamiento-titulo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.entrenamiento-descripcion {
  font-size: 1rem;
  color: #f1f5f9;
  margin: 10px 0;
}

.publicar-button {
  padding: 10px 20px;
  background-color: #facc15;
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.publicar-button:hover {
  background-color: #eab308;
}
</style>
